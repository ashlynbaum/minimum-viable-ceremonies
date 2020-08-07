import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import { attachCustomCommands } from "cypress-firebase"

firebase.initializeApp({
  apiKey: process.env.MVC_FIREBASE_API_KEY,
  authDomain: `${process.env.MVC_FIREBASE_DOMAIN}.firebaseapp.com`,
  databaseURL: `https://${process.env.MVC_FIREBASE_DOMAIN}.firebaseio.com`,
  projectId: `${process.env.MVC_FIREBASE_DOMAIN}`,
  storageBucket: `${process.env.MVC_FIREBASE_DOMAIN}.appspot.com`,
})

attachCustomCommands({ Cypress, cy, firebase })

Cypress.Commands.add('seedRoom', room => (
  cy.callRtdb('set', `rooms/${room.uuid}`, room)
))

Cypress.Commands.add('seedOrganization', organization => (
  cy.callRtdb('set', `organizations/${organization.uuid}`, organization)
))
