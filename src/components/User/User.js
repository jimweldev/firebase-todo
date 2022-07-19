import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import {
  collection,
  onSnapshot,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebaseConfig'

const User = () => {
  // user
  const [user] = useAuthState(auth)
  const uid = user.uid

  // todos
  const [todos, setTodos] = useState([])
  const todosCollectionRef = collection(db, 'todos')

  // update database realtime
  useEffect(() => {
    const q = query(todosCollectionRef, where('userId', '==', uid))

    onSnapshot(q, (snapshot) =>
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    )
  }, [])

  // useEffect(() => {
  //   getTodos()
  // }, [])

  // const getTodos = async () => {
  //   const q = query(todosCollectionRef, where('userId', '==', uid))

  //   const data = await getDocs(q)
  //   setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  // }

  return (
    <>
      <div>{user.displayName}</div>
      <img src={user.photoURL} alt="" />

      <br />

      <button
        onClick={() => {
          signOut(auth)
        }}
      >
        Sign out
      </button>

      <br />
      <br />

      <button
        onClick={() => {
          addDoc(todosCollectionRef, {
            userId: uid,
            title: 'New Title',
            status: 'pending',
          })
        }}
      >
        Add Todo
      </button>

      {todos.length === 0 ? (
        <div>No Todos</div>
      ) : (
        todos.map((todo) => {
          return (
            <div key={todo.id}>
              <div>
                <div>{todo.title}</div>
                <div>{todo.status}</div>
                <button
                  onClick={() => {
                    const todoDoc = doc(db, 'todos', todo.id)
                    const newFields = { status: 'finished' }

                    updateDoc(todoDoc, newFields)
                  }}
                >
                  done
                </button>
                <button
                  onClick={() => {
                    const todoDoc = doc(db, 'todos', todo.id)

                    deleteDoc(todoDoc)
                  }}
                >
                  delete
                </button>
              </div>
              <br />
            </div>
          )
        })
      )}
    </>
  )
}

export default User
