import firebase from "gatsby-plugin-firebase"

const rooms = () => firebase.database().ref('rooms')

export const createRoom = ({ uuid, name, weekCount, ceremonies, participants }) => (
  rooms().child(uuid).set({ uuid, name, weekCount, ceremonies, participants })
)

export const setupRoom = ({ uuid, participants, ceremonies, setParticipants, setCeremonies, setWeekCount }) => {
  const room = rooms().child(uuid)

  room.child('weekCount').on('value', snapshot => (
    setWeekCount(snapshot.toJSON())
  ))

  room.child('participants').on('value', snapshot => (
    Object.values(snapshot.toJSON() || [])
      .filter(({ id, username, roles }) => {
        const participant = participants[id] || {}
        return username !== participant.username || roles !== participant.roles
      }).map(({ id, username, roles }) => setParticipants(current => ({
        ...current, [id]: { ...current[id], id, username, roles }
      })))
  ))

  room.child('ceremonies').on('value', snapshot => (
    Object.values(snapshot.toJSON())
      .filter(({ id, placement }) => placement !== ceremonies[id].placement)
      .map(({ id, placement }) => setCeremonies(current => ({
        ...current, [id]: { ...current[id], placement }
      })))
  ))

  return room.once('value').then(snapshot => ({ ...snapshot.val(), uuid: snapshot.key }))
}

export const teardownRoom = ({ uuid }) => {
  const room = rooms().child(uuid)

  room.child('participants').off('value')
  room.child('placements').off('value')
}

export const setParticipant = ({ uuid }, participant) => (
  rooms().child(`${uuid}/participants/${participant.id}`).set(participant)
)

export const setCeremony = ({ uuid }, ceremony) => (
  rooms().child(`${uuid}/ceremonies/${ceremony.id}`).set(ceremony)
)

export const setRoom = ({ uuid }, { weekCount }) => (
  rooms().child(`${uuid}/weekCount`).set(weekCount)
)
