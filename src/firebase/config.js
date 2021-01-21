import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDLHzOchY_PEPHmJ7yjHL4wOPtej9WVdZw",
  authDomain: "muso-ninjas-vue3.firebaseapp.com",
  projectId: "muso-ninjas-vue3",
  storageBucket: "muso-ninjas-vue3.appspot.com",
  messagingSenderId: "1058420018511",
  appId: "1:1058420018511:web:abd06f29e9b7a03fb0893a"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirebase = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirebase, projectAuth, projectStorage, timestamp }