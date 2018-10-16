import * as firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyDe3IPIr2ZOFVJUc083meXzNIXAXmc4Ia8',
  authDomain: 'listapp-241e5.firebaseapp.com',
  databaseURL: 'https://listapp-241e5.firebaseio.com',
  projectId: 'listapp-241e5',
  storageBucket: 'listapp-241e5.appspot.com',
  messagingSenderId: '146190635037'
}
firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)
const usersCollection = db.collection('users')
const storageRef = firebase.storage().ref()

export default {
  db,
  auth,
  currentUser,
  usersCollection,
  storageRef
}
