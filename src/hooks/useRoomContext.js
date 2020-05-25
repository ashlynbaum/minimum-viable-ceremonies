import { useState, useMemo, useEffect } from "react"
import { useCookies } from "react-cookie"
import { setupRoom, setRoom, setCeremony, setParticipant } from "../db/firebase"
import { document } from "browser-monads"
import roleData from "../data/roles"
import ceremonyData from "../data/ceremonies"

const useRoomContext = (id, draft) => {
  const [uuid, setUuid] = useState(id)
  const [name, setName] = useState("")
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie, removeCookie] = useCookies([uuid])
  const [weekCount, setWeekCount] = useState(1)
  const [participants, setParticipants] = useState({})
  const [ceremonies, setCeremonies] = useState(ceremonyData.reduce(
    (result, id) => ({ ...result, [id]: { id, placement: 'undecided', async: true } })
  , {}))

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
      setWeekCount,
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
  ), [participants, cookie, uuid])

  const [editingRoomId, setEditingRoomId] = useState()
  const editingRoom = editingRoomId

  const [editingUserId, setEditingUserId] = useState()
  const editingUser = participants[editingUserId]

  const [editingCeremonyId, setEditingCeremonyId] = useState()
  const editingCeremony = ceremonies[editingCeremonyId]

  const nameValid = useMemo(() => (
    name && name.length >= 3
  ), [name])

  const shareableLink = useMemo(() => (
    `${document.location.origin}/room/${uuid}`
  ), [uuid])

  const place = (id, placement) => {
    const updated = { ...ceremonies[id], placement }
    setCeremony({ uuid }, updated)
    setCeremonies(current => ({ ...current, [id]: updated }))
  }

  return {
    uuid, setUuid,
    draft,
    roleData,
    ceremonies,
    name, nameValid, setName,
    weekCount,
    shareableLink,
    currentUser,
    participants,
    ready,
    editingRoom, setEditingRoomId,
    editingUser, setEditingUserId,
    editingCeremony, setEditingCeremonyId,
    place,
    placedOn: cadence => Object.values(ceremonies).filter(c => c.placement === cadence),
    modifyRoom: ({ weekCount }) => {
      setRoom({ uuid }, { weekCount })
      setWeekCount(weekCount)

      if (weekCount === 1) {
        Object.values(ceremonies).filter(({ placement }) => (
          ['monday-2', 'tuesday-2', 'wednesday-2', 'thursday-2', 'friday-2'].includes(placement)
        )).map(({ id }) => place(id, 'undecided'))
      }
    },
    login: ({ id, username, roles }, cookie = true) => {
      const user = { id, username, roles, host: !participants }
      return setParticipant({ uuid }, user).then(() => {
        if (cookie) { setCookie(uuid, id) }
        setParticipants(current => ({ ...current, [user.id]: user }))
      })
    },
    logout: () => removeCookie(uuid),
  }
}

export default useRoomContext
