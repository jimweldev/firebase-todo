import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBPB3ecBjlC7fh-QeLuBeczMX5rdJmdI5M',
  authDomain: 'fir-todo-30a14.firebaseapp.com',
  projectId: 'fir-todo-30a14',
  storageBucket: 'fir-todo-30a14.appspot.com',
  messagingSenderId: '618939378495',
  appId: '1:618939378495:web:e85fff00680abb259bc18a',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
