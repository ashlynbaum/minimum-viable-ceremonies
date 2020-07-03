import { useState, useMemo, useEffect, useRef } from "react"
import { useCookies } from "react-cookie"
import { setupRoom, setRoom, setCeremony, setCeremonyCollection, setParticipant } from "../db/firebase"
import { document } from "browser-monads"
import roleData from "../data/roles"
import ceremonyData from "../data/ceremonies"
import cadenceData from "../data/cadences"
import themeData from "../data/themes"
import hourData from "../data/hours"

const useRoomContext = (id, draft) => {
  const [uuid, setUuid] = useState(id)
  const [name, setName] = useState("")
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [cookie, setCookie, removeCookie] = useCookies([uuid])
  const [weekCount, setWeekCount] = useState(1)
  const [participants, setParticipants] = useState({})
  const [ceremonies, setCeremonies] = useState(ceremonyData.reduce(
    (result, id, index) => ({ ...result, [id]: { id, index, placement: 'undecided', async: true } })
  , {}))

  const boardRef = useRef()

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

  const [creatingCeremonyId, setCreatingCeremonyId] = useState()
  const creatingCeremony = creatingCeremonyId

  const [editingUserId, setEditingUserId] = useState()
  const editingUser = participants[editingUserId]

  const [editingCeremonyId, setEditingCeremonyId] = useState()
  const editingCeremony = ceremonies[editingCeremonyId]

  const shareableLink = useMemo(() => (
    `${document.location.origin}/room/${uuid}`
  ), [uuid])

  const place = ({ draggableId, source, destination }) => {
    if (
      !destination ||
      (source.droppableId === destination.droppableId && source.index === destination.index)
    ) { return }

    const filter = ceremony => ceremony.id !== draggableId
    const sort   = (a,b) => b.index < a.index ? 1 : -1
    const reduce = (result, ceremony) => ({ ...result, [ceremony.id]: ceremony })
    const map    = (ceremony, index) => ({ ...ceremony, index })

    const updated = source.droppableId === destination.droppableId
      ? placedOn(source.droppableId)
          .filter(filter)
          .concat({ ...ceremonies[draggableId], index: destination.index + (destination.index > source.index ? 0.5 : -0.5) })
          .sort(sort)
          .map(map)
          .reduce(reduce, {})
      : [
        ...placedOn(source.droppableId)
          .filter(filter)
          .sort(sort)
          .map(map),
        ...placedOn(destination.droppableId)
          .concat({ ...ceremonies[draggableId], placement: destination.droppableId, index: destination.index })
          .sort(sort)
          .map(map),
      ].reduce(reduce, {})

    setCeremonyCollection({ uuid }, { ...ceremonies, ...updated })
    setCeremonies(current => ({ ...current, ...updated }))
  }

  const modifyRoom = ({ weekCount }) => {
    setRoom({ uuid }, { weekCount })
    setWeekCount(weekCount)

    if (weekCount === 1) {
      Object.values(ceremonies).filter(({ placement }) => (
        ['monday-2', 'tuesday-2', 'wednesday-2', 'thursday-2', 'friday-2'].includes(placement)
      )).map(({ id, placement, index }) => (
        place({
          draggableId: id,
          source: { droppableId: placement, index },
          destination: { droppableId: 'undecided', index: -0.5 }
        })
      ))
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

  const placedOn = cadence => (
    Object.values(ceremonies)
      .filter(c => c.placement === cadence)
      .sort((a,b) => a.index > b.index ? 1 : -1)
  )

  return {
    uuid, setUuid,
    draft, complete,
    roleData, cadenceData, hourData, themeData,
    ceremonies,
    name, setName,
    weekCount,
    shareableLink,
    currentUser,
    participants,
    ready,
    editingRoom, setEditingRoomId,
    editingUser, setEditingUserId,
    creatingCeremony, setCreatingCeremonyId,
    editingCeremony, setEditingCeremonyId,
    boardRef,
    place, placedOn,
    modifyRoom, modifyCeremony, modifyParticipant,
    logout: () => removeCookie(uuid),
    toast, showToast: (message, length = 2500) => {
      clearTimeout(toast.timeout)
      setToast({ message, visible: true, timeout: (
        setTimeout(() => setToast(toast => ({ ...toast, visible: false })), length)
      ) })
    }
  }
}

export default useRoomContext
