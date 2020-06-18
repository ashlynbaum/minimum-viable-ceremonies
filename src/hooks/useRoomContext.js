import { useState, useMemo, useEffect } from "react"
import { useCookies } from "react-cookie"
import { setupRoom, setRoom, setCeremony, setParticipant } from "../db/firebase"
import { document } from "browser-monads"
import roleData from "../data/roles"
import ceremonyData from "../data/ceremonies"
import cadenceData from "../data/cadences"
import hourData from "../data/hours"

const useRoomContext = (id, draft) => {
  const [uuid, setUuid] = useState(id)
  const [name, setName] = useState("")
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
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
      modifyCeremony,
      participants,
      modifyParticipant,
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

  useEffect(() => {
    if (
      !complete &&
      Object.values(ceremonies).filter(c => c.placement === 'undecided').length === 0
    ) { setComplete(true) }
  }, [ceremonies, complete])

  const currentUser = useMemo(() => (
    Object.values(participants).find(p => p.id === cookie[uuid])
  ), [participants, cookie, uuid])

  const [editingRoomId, setEditingRoomId] = useState()
  const editingRoom = editingRoomId

  const [editingUserId, setEditingUserId] = useState()
  const editingUser = participants[editingUserId]

  const [editingCeremonyId, setEditingCeremonyId] = useState()
  const editingCeremony = ceremonies[editingCeremonyId]

  const shareableLink = useMemo(() => (
    `${document.location.origin}/room/${uuid}`
  ), [uuid])

  const place = (id, placement) => {
    const updated = { ...ceremonies[id], placement }
    setCeremony({ uuid }, updated)
    setCeremonies(current => ({ ...current, [id]: updated }))
  }

  const modifyRoom = ({ weekCount }) => {
    setRoom({ uuid }, { weekCount })
    setWeekCount(weekCount)

    if (weekCount === 1) {
      Object.values(ceremonies).filter(({ placement }) => (
        ['monday-2', 'tuesday-2', 'wednesday-2', 'thursday-2', 'friday-2'].includes(placement)
      )).map(({ id }) => place(id, 'undecided'))
    }
  }

  const modifyCeremony = (id, attrs, syncDb = true) => {
    const updated = { ...ceremonies[id], ...attrs }
    setCeremonies(current => ({ ...current, [id]: updated }))
    return syncDb && setCeremony({ uuid }, updated)
  }

  const modifyParticipant = (id, attrs, cookie = true, syncDb = true) => {
    const updated = { ...participants[id], ...attrs }
    setParticipants(current => ({ ...current, [id]: updated }))
    return syncDb && setParticipant({ uuid }, updated).then(() => {
      if (cookie) { setCookie(uuid, id) }
    })
  }

  return {
    uuid, setUuid,
    draft, complete,
    roleData, cadenceData, hourData,
    ceremonies,
    name, setName,
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
    modifyRoom, modifyCeremony, modifyParticipant,
    logout: () => removeCookie(uuid),
  }
}

export default useRoomContext
