import debounce from "debounce-promise"
import firebase from "gatsby-plugin-firebase"

export const set = (path, data) => ref(path).set(data)
export const sync = (path, callback) => ref(path).on('value', callback)
export const unsync = path => ref(path).off('value')

export const load = path => (
  ref(path).once('value').then(snapshot => ({ ...snapshot.val(), uuid: snapshot.key }))
)

export const debouncedWrite = type => (
  debounce((uuid, path, data) => set(`${type}/${uuid}/${path}`, data), 300)
)

const ref = path => firebase.database().ref(path)
