import { firebase } from "@firebase/app"
import "@firebase/database"
import phrase from "random-words"

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_DOMAIN}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_DOMAIN}.firebaseio.com`,
  projectId: `${process.env.FIREBASE_DOMAIN}`,
  storageBucket: `${process.env.FIREBASE_DOMAIN}.appspot.com`,
})

const rooms = firebase.database().ref('rooms')

const createRoom = state => {
  const uuid = phrase({ exactly: 3, join: '-' })
  return rooms.child(uuid).set({ ...state, uuid }).then(() => ({ ...state, uuid }))
}

export const setupRoom = state => {
  if (!state.uuid) {
    return createRoom(state).then(setupRoom)
  }
  const room = rooms.child(state.uuid)

  room.child('participants').on('value', snapshot => (
    console.log('participants', snapshot)
  ))
  room.child('placements').on('value', snapshot => (
    console.log('participants', snapshot)
  ))

  return room.once('value').then(snapshot => ({ ...snapshot.val(), uuid: snapshot.key }))
}

export const teardownRoom = uuid => {
  const room = rooms.child(uuid)

  room.child('participants').off('value')
  room.child('placements').off('value')
}

export const setParticipant = (room, participants) => {
  room.child('participants').set(participants)
}

export const setPlacement = (room, placement) => (
  room.child('placements').set(placement)
)
