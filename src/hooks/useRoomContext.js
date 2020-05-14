import { useState, useMemo } from "react"
import { setupRoom, setCeremony } from "../db/firebase"

const useRoomContext = id => {
  const allCeremonies = [
    "checkin", "cleanup", "demo", "design_review", "documentation",
    "estimation", "growth", "hackathon", "horizon", "insight", "planning",
    "process", "retreat", "retrospective", "review", "roadmap", "social",
    "solution", "spec", "standdown", "standup", "sync", "techdebt"
  ]
  const allRoles = [
    "actioner", "cheerleader", "conductor", "guardian",
    "historian", "timekeeper", "wildcard"
  ]

  const [uuid, setUuid] = useState(id)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, loginAs] = useState()
  const [weekCount, setWeekCount] = useState()
  const [participants, setParticipants] = useState({})
  const [ceremonies, setCeremonies] = useState(allCeremonies.reduce(
    (result, name) => ({ ...result, [name]: { name, placement: 'undecided', method: 'sync' } })
  , {}))

  const setup = () => {
    if (loading || !uuid) { return }
    setLoading(true)

    setupRoom(uuid).then(state => {
      setUuid(state.uuid)
      setWeekCount(state.weekCount)
      setCeremonies(state.ceremonies)
      setParticipants(state.participants)
      setReady(true)
    })
  }

  const uuidValid = useMemo(() => (
    uuid && uuid.length >= 8
  ), [uuid])
  const weekCountValid = useMemo(() => (
    !!weekCount
  ), [weekCount])

  return {
    allRoles, allCeremonies,
    uuid, uuidValid, setUuid,
    weekCount, weekCountValid, setWeekCount,
    user,
    loginAs,
    participants,
    ceremonies,
    setup,
    ready,
    placedOn: cadence => Object.values(ceremonies).filter(c => c.placement === cadence),
    place: (name, placement) => {
      const updated = { ...ceremonies[name], placement }
      setCeremony({ uuid }, updated)
      setCeremonies(current => ({ ...current, [name]: updated }))
    }
  }
}

export default useRoomContext
