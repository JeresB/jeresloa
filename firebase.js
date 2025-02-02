import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0h88a-oFL-XOM1FwEfsq8XyAho8Z1y78",
  authDomain: "jeresloa-b2f08.firebaseapp.com",
  projectId: "jeresloa-b2f08",
  storageBucket: "jeresloa-b2f08.firebasestorage.app",
  messagingSenderId: "209256722888",
  appId: "1:209256722888:web:c09f559e343f7176a610fd"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)