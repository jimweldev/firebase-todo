import React from 'react'
import { signOut } from 'firebase/auth'

import { auth } from '../../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'

const User = () => {
  const [user] = useAuthState(auth)

  return (
    <>
      <div>{user.displayName}</div>
      <img src={user.photoURL} alt="" />
      <button
        onClick={() => {
          signOut(auth)
        }}
      >
        Sign out
      </button>
    </>
  )
}

export default User
