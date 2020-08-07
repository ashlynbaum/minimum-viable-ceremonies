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

const seed = model => fixture => (
  cy.fixture(`${model}/${fixture}.json`).then(json => (
    cy.callRtdb('set', `${model}/${json.uuid}`, json)
  ))
)

Cypress.Commands.add('seedRoom', seed('rooms'))
Cypress.Commands.add('seedOrganization', seed('organizations'))
