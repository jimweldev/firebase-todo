import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../firebaseConfig'
import './Login.css'

const Login = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth)

  return (
    <div className="login">
      <h1>Login</h1>
      <button
        onClick={() => {
          signInWithGoogle('', { promt: 'select_account' })
        }}
      >
        Google
      </button>
    </div>
  )
}

export default Login
