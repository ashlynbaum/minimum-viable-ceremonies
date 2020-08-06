import firebase from "gatsby-plugin-firebase"

export const signIn = () => (
  firebase.auth().currentUser
    ? Promise.resolve({ user: firebase.auth().currentUser })
    : firebase.auth().signInAnonymously()
)

export const authWithGoogle = () => {
  firebase.auth().useDeviceLanguage()

  const provider = new firebase.auth.GoogleAuthProvider()

  return firebase.auth().signInWithPopup(provider).then(({ user }) => ({
    image: user.photoURL,
    username: user.displayName,
    email: user.email,
    uid: user.uid,
  })).catch(console.log)
}
