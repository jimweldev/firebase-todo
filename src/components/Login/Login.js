import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../firebaseConfig'

const Login = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth)

  return (
    <>
      <h1>Login</h1>
      <button
        onClick={() => {
          signInWithGoogle('', { promt: 'select_account' })
        }}
      >
        Google
      </button>
    </>
  )
}

export default Login
