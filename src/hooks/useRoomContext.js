import { useState, useMemo } from "react"
import { useCookies } from "react-cookie"
import { setupRoom, setCeremony, setParticipant } from "../db/firebase"
import { document } from "browser-monads"

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
  const [name, setName] = useState("")
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie, removeCookie] = useCookies([uuid])
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
    allRoles, allCeremonies,
    name, nameValid, setName,
    weekCount, weekCountValid, setWeekCount,
    shareableLink,
    currentUser,
    participants,
    ceremonies,
    setup,
    ready,
    placedOn: cadence => Object.values(ceremonies).filter(c => c.placement === cadence),
    login: ({ id, username, role }) => {
      const user = { id, username, role, host: !participants }
      return setParticipant({ uuid }, user).then(() => {
        setParticipants(current => ({ ...current, [user.id]: user }))
        setCookie(uuid, id)
      })
    },
    logout: () => removeCookie(uuid),
    place: (name, placement) => {
      const updated = { ...ceremonies[name], placement }
      setCeremony({ uuid }, updated)
      setCeremonies(current => ({ ...current, [name]: updated }))
    }
  }
}

export default useRoomContext
