import firebase from "gatsby-plugin-firebase"

export const callFunction = (name, data) => (
  firebase.functions().httpsCallable(name)(data)
)
