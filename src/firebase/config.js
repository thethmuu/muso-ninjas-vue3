import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB8IV46iv-2u0m_-l35_mjTwEga5B1PS50",
  authDomain: "muso-ninjas-music-app.firebaseapp.com",
  projectId: "muso-ninjas-music-app",
  storageBucket: "muso-ninjas-music-app.appspot.com",
  messagingSenderId: "1018508360256",
  appId: "1:1018508360256:web:60132db40836f174853da5"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }