import { firebase } from "@firebase/app"
import "@firebase/database"

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_DOMAIN}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_DOMAIN}.firebaseio.com`,
  projectId: `${process.env.FIREBASE_DOMAIN}`,
  storageBucket: `${process.env.FIREBASE_DOMAIN}.appspot.com`,
})

const rooms = firebase.database().ref('rooms')

export const createRoom = ({ uuid, weekCount, roles, ceremonies, participants }) => (
  rooms.child(uuid).set({ uuid, weekCount, roles, ceremonies, participants })
)

export const setupRoom = roomState => {
  if (!roomState.uuid) {
    console.log('tried to setup a room without a uuid!')
    return
  }
  const room = rooms.child(roomState.uuid)

  room.child('participants').on('value', snapshot => (
    console.log('participants', snapshot)
  ))
  room.child('placements').on('value', snapshot => (
    console.log('participants', snapshot)
  ))

  return room.once('value').then(snapshot => ({ ...snapshot.val(), uuid: snapshot.key }))
}

export const teardownRoom = ({ uuid }) => {
  const room = rooms.child(uuid)

  room.child('participants').off('value')
  room.child('placements').off('value')
}

export const setParticipant = ({ uuid }, participant) => (
  rooms.child(`${uuid}/participants/${participant.id}`).set(participant)
)

export const setPlacement = (room, placement) => (
  room.child('placements').set(placement)
)
