import firebase from "gatsby-plugin-firebase"
import debounce from "debounce-promise"
import { navigate } from "gatsby"

const rooms = () => firebase.database().ref('rooms')

export const createRoom = ({ uuid, name, weekCount, ceremonies, participants }) => (
  rooms()
    .child(uuid)
    .set({ uuid, name, weekCount, ceremonies, participants })
    .then(() => navigate(`room/${uuid}`))
)

export const setupRoom = ({ uuid, participants, ceremonies, modifyParticipant, modifyCeremony, setWeekCount }) => {
  const room = rooms().child(uuid)

  room.child('weekCount').on('value', snapshot => (
    setWeekCount(snapshot.toJSON())
  ))

  room.child('participants').on('value', snapshot => (
    Object.values(snapshot.toJSON() || [])
      .filter(({ id, username, roles }) => {
        const participant = participants[id] || {}
        return username !== participant.username || roles !== participant.roles
      }).map(participant => modifyParticipant(participant.id, participant, false, false))
  ))

  room.child('ceremonies').on('value', snapshot => (
    Object.values(snapshot.toJSON())
      .filter(({ id, placement, async }) => (
        placement !== ceremonies[id].placement || async !== ceremonies[id].async
      )).map(ceremony => modifyCeremony(ceremony.id, ceremony, false))
  ))

  return room.once('value').then(snapshot => ({ ...snapshot.val(), uuid: snapshot.key }))
}

export const teardownRoom = ({ uuid }) => {
  const room = rooms().child(uuid)

  room.child('participants').off('value')
  room.child('placements').off('value')
}

export const setParticipant = debounce(({ uuid }, participant) => (
  rooms().child(`${uuid}/participants/${participant.id}`).set(participant)
), 300)

export const setCeremony = debounce(({ uuid }, ceremony) => (
  rooms().child(`${uuid}/ceremonies/${ceremony.id}`).set(ceremony)
), 300)

export const setRoom = debounce(({ uuid }, { weekCount }) => (
  rooms().child(`${uuid}/weekCount`).set(weekCount)
), 300)
