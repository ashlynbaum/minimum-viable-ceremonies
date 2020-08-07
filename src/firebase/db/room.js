import { signIn } from "../auth"
import { navigate } from "gatsby"
import { set, sync, unsync, load, debouncedWrite } from "./common"

export default {
  create: ({ uuid, name, weekCount, ceremonies, participants }) => (
    signIn()
      .then(() => set(`rooms/${uuid}`, { uuid, name, weekCount, ceremonies, participants }))
      .then(() => navigate(`room/${uuid}`))
  ),

  setup: ({ uuid, participants, ceremonies, modifyParticipant, modifyCeremony, modifyFeature, setWeekCount }) => (
    signIn().then(() => {
      sync(`rooms/${uuid}/weekCount`, snapshot => setWeekCount(snapshot.toJSON()))
      sync(`rooms/${uuid}/features`, snapshot => modifyFeature(snapshot.toJSON()))
      sync(`rooms/${uuid}/participants`, snapshot => (
        Object.values(snapshot.toJSON() || [])
        .filter(({ id, username, roles }) => {
          const participant = participants[id] || {}
          return username !== participant.username || roles !== participant.roles
        }).map(participant => modifyParticipant(participant.id, participant, false, false))
      ))
      sync(`rooms/${uuid}/ceremonies`, snapshot => (
        Object.values(snapshot.toJSON())
        .filter(({ id, placement, async }) => (
          !ceremonies[id] ||
          placement !== ceremonies[id].placement ||
          async !== ceremonies[id].async
        )).map(ceremony => (
          modifyCeremony(ceremony.id, ceremony, false)
        ))
      ))

      return load(`rooms/${uuid}`)
    })
  ),

  teardown: uuid => {
    unsync(`rooms/${uuid}/weekCount`)
    unsync(`rooms/${uuid}/features`)
    unsync(`rooms/${uuid}/participants`)
    unsync(`rooms/${uuid}/ceremonies`)
  },

  write: debouncedWrite('rooms')
}
