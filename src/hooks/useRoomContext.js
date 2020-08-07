import { useState, useMemo, useEffect, useRef } from "react"
import { useCookies } from "react-cookie"

import roomTable from "../firebase/db/room"
import organizationTable from "../firebase/db/organization"

import { document } from "browser-monads"
import roleData from "../data/roles"
import ceremonyData from "../data/ceremonies"
import cadenceData from "../data/cadences"
import themeData from "../data/themes"
import hourData from "../data/hours"

const useRoomContext = (id, draft) => {
  const [uuid, setUuid] = useState(id)
  const [name, setName] = useState("")
  const [organization, setOrganization] = useState({})
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [cookie, setCookie, removeCookie] = useCookies([uuid])
  const [weekCount, setWeekCount] = useState(1)
  const [participants, setParticipants] = useState({})
  const [features, setFeatures] = useState({})
  const [ceremonies, setCeremonies] = useState(ceremonyData.reduce(
    (result, id, index) => ({ ...result, [id]: { id, index, placement: 'undecided', async: true } })
  , {}))

  const boardRef = useRef()

  useEffect(() => {
    if (draft || loading) { return }
    setReady(false)
    setLoading(true)

    roomTable.setup({
      uuid,
      ceremonies,
      participants,
      modifyCeremony,
      modifyParticipant,
      modifyFeature,
      setWeekCount,
    }).then(state => {
      setUuid(state.uuid)
      setName(state.name)
      setWeekCount(state.weekCount)
      setCeremonies(state.ceremonies || {})
      setParticipants(state.participants || {})
      setFeatures(current => ({ ...current, ...state.features }))

      organizationTable.setup({
        uuid: state.organizationUuid,
        modifyFeature,
      }).then(({ uuid, name, image, features }) => {
        setOrganization({ uuid, name, image })
        setFeatures(current => ({ ...current, ...features }))
        setLoading(false)
        setReady(true)
      })
    })
  }, [uuid])

  useEffect(() => {
    if (
      !complete &&
      Object.values(ceremonies).filter(c => c.placement === 'undecided').length === 0
    ) { setComplete(true) }
  }, [ceremonies, complete])

  useEffect(() => (
    () => {
      roomTable.teardown(uuid)
      organizationTable.teardown(organization.uuid)
    }
  ), [])

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

    roomTable.write(uuid, 'ceremonies', { ...ceremonies, ...updated })
    setCeremonies(current => ({ ...current, ...updated }))
  }

  const modifyRoom = ({ weekCount }) => {
    roomTable.write(uuid, 'weekCount', weekCount)
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
    return syncDb && roomTable.write(uuid, `ceremonies/${updated.id}`, updated)
  }

  const modifyParticipant = (id, attrs, cookie = true, syncDb = true) => {
    const updated = { ...participants[id], ...attrs, roles: Object.values(attrs.roles || []) }
    setParticipants(current => ({ ...current, [id]: updated }))
    return syncDb && roomTable.write(uuid, `participants/${updated.id}`, updated).then(() => {
      if (cookie) { setCookie(uuid, id) }
    })
  }

  const modifyFeature = (key, value) => (
    setFeatures(current => ({ ...current, [key]: value }))
  )

  const placedOn = cadence => Object.values(ceremonies).filter(c => c.placement === cadence)

  return {
    uuid, setUuid,
    draft, complete,
    roleData, cadenceData, hourData, themeData,
    ceremonies,
    name, setName,
    organization,
    weekCount,
    shareableLink,
    currentUser,
    participants,
    features,
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
