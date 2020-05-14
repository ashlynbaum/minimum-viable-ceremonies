import firebase from "gatsby-plugin-firebase"

const rooms = () => firebase.database().ref('rooms')

export const createRoom = ({ uuid, weekCount, ceremonies, participants }) => (
  rooms().child(uuid).set({ uuid, weekCount, ceremonies, participants })
)

export const setupRoom = uuid => {
  const room = rooms().child(uuid)

  room.child('participants').on('value', snapshot => (
    console.log('participants', snapshot)
  ))
  room.child('placements').on('value', snapshot => (
    console.log('participants', snapshot)
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
  rooms().child(`${uuid}/ceremonies/${ceremony.name}`).set(ceremony)
)
