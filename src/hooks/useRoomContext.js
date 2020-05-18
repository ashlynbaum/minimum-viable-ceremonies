import { useState, useMemo } from "react"
import { useCookies } from "react-cookie"
import { setupRoom, setCeremony, setParticipant } from "../db/firebase"
import { document } from "browser-monads"
import roles from "../data/roles"
import ceremonyData from "../data/ceremonies"

const useRoomContext = id => {
  const [uuid, setUuid] = useState(id)
  const [name, setName] = useState("")
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [creatingRoom, createRoom] = useState(false)
  const [cookie, setCookie, removeCookie] = useCookies([uuid])
  const [weekCount, setWeekCount] = useState()
  const [participants, setParticipants] = useState({})
  const [ceremonies, setCeremonies] = useState(ceremonyData.reduce(
    (result, id) => ({ ...result, [id]: { id, placement: 'undecided' } })
  , {}))

  const setup = () => {
    if (loading || !uuid) { return }
    setLoading(true)

    setupRoom({
      uuid,
      ceremonies,
      setCeremonies,
      participants,
      setParticipants,
    }).then(state => {
      setUuid(state.uuid)
      setName(state.name)
      setWeekCount(state.weekCount)
      setCeremonies(state.ceremonies)
      setParticipants(state.participants || {})
      setReady(true)
    })
  }

  const currentUser = useMemo(() => (
    Object.values(participants).find(p => p.id === cookie[uuid])
  ), [participants, cookie, uuid])

  const nameValid = useMemo(() => (
    name && name.length >= 8
  ), [name])

  const weekCountValid = useMemo(() => (
    !!weekCount
  ), [weekCount])

  const shareableLink = useMemo(() => (
    `${document.location.origin}/room/${uuid}`
  ), [uuid])

  return {
    uuid,
    roles, ceremonies,
    name, nameValid, setName,
    weekCount, weekCountValid, setWeekCount,
    shareableLink,
    currentUser,
    participants,
    setup,
    ready,
    creatingRoom, createRoom,
    placedOn: cadence => Object.values(ceremonies).filter(c => c.placement === cadence),
    login: ({ id, username, role }) => {
      const user = { id, username, role, host: !participants }
      return setParticipant({ uuid }, user).then(() => {
        setParticipants(current => ({ ...current, [user.id]: user }))
        setCookie(uuid, id)
      })
    },
    logout: () => removeCookie(uuid),
    place: (id, placement) => {
      const updated = { ...ceremonies[id], placement }
      setCeremony({ uuid }, updated)
      setCeremonies(current => ({ ...current, [id]: updated }))
    }
  }
}

export default useRoomContext
