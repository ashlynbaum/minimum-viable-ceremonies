import { firebase } from "@firebase/app"
import "@firebase/database"
import phrase from "random-words"

firebase.initializeApp({
  apiKey: "AIzaSyBnCV1QH7tDOA0a8DvuDzFVlMwYVstfiSA",
  authDomain: "minimum-viable-ceremonies.firebaseapp.com",
  databaseURL: "https://minimum-viable-ceremonies.firebaseio.com",
  projectId: "minimum-viable-ceremonies",
  storageBucket: "minimum-viable-ceremonies.appspot.com",
  messagingSenderId: "283274833571",
  appId: "1:283274833571:web:2a88d39144012baf46d916"
})

const rooms = firebase.database().ref('rooms')

const createRoom = () => {
  const uuid = phrase({ exactly: 3, join: '-' })
  return rooms.child(uuid).set({
    participants: { test: 'wark' },
    placements: { test: 'wark' }
  }).then(() => uuid)
}

export const setupRoom = (uuid, setter) => {
  if (!uuid) {
    return createRoom().then(uuid => setupRoom(uuid, setter))
  }
  const room = rooms.child(uuid)

  room.child('participants').on('value', snapshot => (
    console.log('participants', snapshot)
  ))
  room.child('placements').on('value', snapshot => (
    console.log('participants', snapshot)
  ))

  return room.once('value').then(snapshot => (
    setter({ ...snapshot.val(), uuid: snapshot.key })
  ))
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
