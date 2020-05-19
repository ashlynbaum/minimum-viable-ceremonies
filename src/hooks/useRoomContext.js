import { useState, useMemo, useEffect } from "react"
import { useCookies } from "react-cookie"
import { setupRoom, setCeremony, setParticipant } from "../db/firebase"
import { document } from "browser-monads"
import roles from "../data/roles"
import ceremonyData from "../data/ceremonies"

const useRoomContext = (id, draft) => {
  const [uuid, setUuid] = useState(id)
  const [name, setName] = useState("")
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie, removeCookie] = useCookies([uuid])
  const [weekCount, setWeekCount] = useState()
  const [participants, setParticipants] = useState({})
  const [ceremonies, setCeremonies] = useState(ceremonyData.reduce(
    (result, id) => ({ ...result, [id]: { id, placement: 'undecided' } })
  , {}))
  const [currentUserFlag, setCurrentUserFlag] = useState(false)

  useEffect(() => {
    if (draft || loading) { return }
    setReady(false)
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
      setCeremonies(state.ceremonies || {})
      setParticipants(state.participants || {})
      setLoading(false)
      setReady(true)
    })
  }, [uuid])

  const currentUser = useMemo(() => (
    Object.values(participants).find(p => p.id === cookie[uuid])
  ), [participants, cookie, uuid, currentUserFlag])

  const [editingRoomId, setEditingRoomId] = useState()
  const editingRoom = editingRoomId

  const [editingUserId, setEditingUserId] = useState()
  const editingUser = participants[editingUserId]

  const [editingCeremonyId, setEditingCeremonyId] = useState()
  const editingCeremony = ceremonies[editingCeremonyId]

  const nameValid = useMemo(() => (
    name && name.length >= 3
  ), [name])

  const weekCountValid = useMemo(() => (
    !!weekCount
  ), [weekCount])

  const shareableLink = useMemo(() => (
    `${document.location.origin}/room/${uuid}`
  ), [uuid])

  return {
    uuid, setUuid,
    roles, ceremonies,
    name, nameValid, setName,
    weekCount, weekCountValid, setWeekCount,
    shareableLink,
    currentUser,
    participants,
    ready,
    editingRoom, setEditingRoomId,
    editingUser, setEditingUserId,
    editingCeremony, setEditingCeremonyId,
    placedOn: cadence => Object.values(ceremonies).filter(c => c.placement === cadence),
    login: ({ id, username, role }, cookie = true) => {
      const user = { id, username, role, host: !participants }
      return setParticipant({ uuid }, user).then(() => {
        if (cookie) { setCookie(uuid, id) }
        setParticipants(current => ({ ...current, [user.id]: user }))
        setCurrentUserFlag(current => !current)
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
