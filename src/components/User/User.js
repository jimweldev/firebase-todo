import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebaseConfig'

const User = () => {
  const [user] = useAuthState(auth)
  const [todos, setTodos] = useState([])

  const todosCollectionRef = collection(db, 'todos')

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    const data = await getDocs(todosCollectionRef)

    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  return (
    <>
      <div>{user.displayName}</div>
      <div>{user.uid}</div>
      <img src={user.photoURL} alt="" />
      <button
        onClick={() => {
          signOut(auth)
        }}
      >
        Sign out
      </button>
      {todos.map((todo) => {
        return <div key={todo.id}>{todo.title}</div>
      })}
    </>
  )
}

export default User
