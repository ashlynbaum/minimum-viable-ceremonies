import { useState, useMemo } from "react"
import { setupRoom } from "../db/firebase"

const useRoomContext = id => {
  const [uuid, setUuid] = useState(id)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, loginAs] = useState()
  const [weekCount, setWeekCount] = useState()

  const [ceremonies, setCeremonies] = useState({
    undecided: [
      "checkin", "cleanup", "demo", "design_review", "documentation",
      "estimation", "growth", "hackathon", "horizon", "insight", "planning",
      "process", "retreat", "retrospective", "review", "roadmap", "social",
      "solution", "spec", "standdown", "standup", "sync", "techdebt"
    ]
  })

  const [roles, setRoles] = useState({
    undecided: [
      "actioner", "cheerleader", "conductor", "guardian",
      "historian", "timekeeper", "wildcard"
    ]
  })

  const [participants, setParticipants] = useState({
    host: {
      name: "somename",
      host: true
    }
  })

  const setup = () => {
    if (loading || !uuid) { return }
    setLoading(true)

    setupRoom({ uuid, ceremonies, participants, roles }).then(state => {
      setUuid(state.uuid)
      setWeekCount(state.weekCount)
      setCeremonies(state.ceremonies)
      setParticipants(state.participants)
      setRoles(state.roles)
      setReady(true)
    })
  }

  const handleDrop = setter => (
    ({ draggableId, destination, source }) => (
      setter(current => ({
          ...current,
          [destination.droppableId]: (current[destination.droppableId] || []).concat(draggableId),
          [source.droppableId]: (current[source.droppableId] || []).filter(v => v !== draggableId),
      }))
    )
  )

  const uuidValid = useMemo(() => (
    uuid && uuid.length >= 8
  ), [uuid])
  const weekCountValid = useMemo(() => (
    !!weekCount
  ), [weekCount])

  return {
    uuid, uuidValid, setUuid,
    weekCount, weekCountValid, setWeekCount,
    user,
    loginAs,
    participants,
    roles,
    ceremonies,
    setup,
    ready,
    moveCeremony: handleDrop(setCeremonies),
    moveRole: handleDrop(setRoles)
  }
}

export default useRoomContext
