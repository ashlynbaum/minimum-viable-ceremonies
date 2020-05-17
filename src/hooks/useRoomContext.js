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
  const roles = {
    actioner: {
      id: "actioner",
      name: "Actioner",
      icon: "💪",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut euismod est. Suspendisse sagittis a urna nec pretium. Fusce consequat urna sed mi vestibulum aliquam. Vestibulum et mi et quam auctor fringilla eget sed neque. Duis rhoncus enim a libero sollicitudin cursus. Sed varius mattis malesuada. Integer enim magna, feugiat at felis sit amet, porttitor posuere ligula. Sed iaculis ornare nibh, sit amet consectetur turpis aliquam id. Nulla dignissim purus quis vehicula sodales. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi accumsan metus sapien, eget hendrerit est placerat quis. Praesent elit diam, vehicula ac feugiat vitae, maximus sit amet est. Integer efficitur ipsum sem, id accumsan ligula rhoncus iaculis. Phasellus malesuada elementum malesuada. Duis tempor erat non neque placerat consequat."
    },
    cheerleader: {
      id: "cheerleader",
      name: "Cheerleader",
      icon: "🎉",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut euismod est. Suspendisse sagittis a urna nec pretium. Fusce consequat urna sed mi vestibulum aliquam. Vestibulum et mi et quam auctor fringilla eget sed neque. Duis rhoncus enim a libero sollicitudin cursus. Sed varius mattis malesuada. Integer enim magna, feugiat at felis sit amet, porttitor posuere ligula. Sed iaculis ornare nibh, sit amet consectetur turpis aliquam id. Nulla dignissim purus quis vehicula sodales. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi accumsan metus sapien, eget hendrerit est placerat quis. Praesent elit diam, vehicula ac feugiat vitae, maximus sit amet est. Integer efficitur ipsum sem, id accumsan ligula rhoncus iaculis. Phasellus malesuada elementum malesuada. Duis tempor erat non neque placerat consequat."
    },
    conductor: {
      id: "conductor",
      name: "Conductor",
      icon: "🚄",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut euismod est. Suspendisse sagittis a urna nec pretium. Fusce consequat urna sed mi vestibulum aliquam. Vestibulum et mi et quam auctor fringilla eget sed neque. Duis rhoncus enim a libero sollicitudin cursus. Sed varius mattis malesuada. Integer enim magna, feugiat at felis sit amet, porttitor posuere ligula. Sed iaculis ornare nibh, sit amet consectetur turpis aliquam id. Nulla dignissim purus quis vehicula sodales. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi accumsan metus sapien, eget hendrerit est placerat quis. Praesent elit diam, vehicula ac feugiat vitae, maximus sit amet est. Integer efficitur ipsum sem, id accumsan ligula rhoncus iaculis. Phasellus malesuada elementum malesuada. Duis tempor erat non neque placerat consequat."
    },
    guardian: {
      id: "guardian",
      name: "Guardian",
      icon: "🛡️",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut euismod est. Suspendisse sagittis a urna nec pretium. Fusce consequat urna sed mi vestibulum aliquam. Vestibulum et mi et quam auctor fringilla eget sed neque. Duis rhoncus enim a libero sollicitudin cursus. Sed varius mattis malesuada. Integer enim magna, feugiat at felis sit amet, porttitor posuere ligula. Sed iaculis ornare nibh, sit amet consectetur turpis aliquam id. Nulla dignissim purus quis vehicula sodales. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi accumsan metus sapien, eget hendrerit est placerat quis. Praesent elit diam, vehicula ac feugiat vitae, maximus sit amet est. Integer efficitur ipsum sem, id accumsan ligula rhoncus iaculis. Phasellus malesuada elementum malesuada. Duis tempor erat non neque placerat consequat."
    },
    historian: {
      id: "historian",
      name: "Historian",
      icon: "📚",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut euismod est. Suspendisse sagittis a urna nec pretium. Fusce consequat urna sed mi vestibulum aliquam. Vestibulum et mi et quam auctor fringilla eget sed neque. Duis rhoncus enim a libero sollicitudin cursus. Sed varius mattis malesuada. Integer enim magna, feugiat at felis sit amet, porttitor posuere ligula. Sed iaculis ornare nibh, sit amet consectetur turpis aliquam id. Nulla dignissim purus quis vehicula sodales. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi accumsan metus sapien, eget hendrerit est placerat quis. Praesent elit diam, vehicula ac feugiat vitae, maximus sit amet est. Integer efficitur ipsum sem, id accumsan ligula rhoncus iaculis. Phasellus malesuada elementum malesuada. Duis tempor erat non neque placerat consequat."
    },
    timekeeper: {
      id: "timekeeper",
      name: "Timekeeper",
      icon: "⏰",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut euismod est. Suspendisse sagittis a urna nec pretium. Fusce consequat urna sed mi vestibulum aliquam. Vestibulum et mi et quam auctor fringilla eget sed neque. Duis rhoncus enim a libero sollicitudin cursus. Sed varius mattis malesuada. Integer enim magna, feugiat at felis sit amet, porttitor posuere ligula. Sed iaculis ornare nibh, sit amet consectetur turpis aliquam id. Nulla dignissim purus quis vehicula sodales. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi accumsan metus sapien, eget hendrerit est placerat quis. Praesent elit diam, vehicula ac feugiat vitae, maximus sit amet est. Integer efficitur ipsum sem, id accumsan ligula rhoncus iaculis. Phasellus malesuada elementum malesuada. Duis tempor erat non neque placerat consequat."
    },
    wildcard: {
      id: "wildcard",
      name: "Wildcard",
      icon: "🃏",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut euismod est. Suspendisse sagittis a urna nec pretium. Fusce consequat urna sed mi vestibulum aliquam. Vestibulum et mi et quam auctor fringilla eget sed neque. Duis rhoncus enim a libero sollicitudin cursus. Sed varius mattis malesuada. Integer enim magna, feugiat at felis sit amet, porttitor posuere ligula. Sed iaculis ornare nibh, sit amet consectetur turpis aliquam id. Nulla dignissim purus quis vehicula sodales. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi accumsan metus sapien, eget hendrerit est placerat quis. Praesent elit diam, vehicula ac feugiat vitae, maximus sit amet est. Integer efficitur ipsum sem, id accumsan ligula rhoncus iaculis. Phasellus malesuada elementum malesuada. Duis tempor erat non neque placerat consequat."
    }
  }

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
    roles, allCeremonies,
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
