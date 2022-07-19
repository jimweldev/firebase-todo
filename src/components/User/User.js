import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import {
  collection,
  onSnapshot,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebaseConfig'

const User = () => {
  // =============[AUTH]=============
  const [user] = useAuthState(auth)
  const uid = user.uid
  const name = user.displayName
  const photo = user.photoURL

  // =============[TODO]=============
  const [todos, setTodos] = useState([])
  const todosCollectionRef = collection(db, 'todos')

  // todo fields
  const [newTitle, setNewTitle] = useState('')

  // todo create
  const handleTodoSubmit = async (e) => {
    e.preventDefault()

    await addDoc(todosCollectionRef, {
      userId: uid,
      title: newTitle,
      status: 'pending',
      createdAt: serverTimestamp(),
    })

    setNewTitle('')
  }

  // todo read realtime
  useEffect(() => {
    const q = query(
      todosCollectionRef,
      where('userId', '==', uid),
      orderBy('createdAt', 'desc')
    )

    onSnapshot(q, (snapshot) =>
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    )
  }, [])

  // todo update
  const handleTodoUpdate = async (id) => {
    const todoDoc = doc(db, 'todos', id)
    const newFields = { status: 'finished' }

    await updateDoc(todoDoc, newFields)
  }

  // todo delete
  const handleTodoDelete = async (id) => {
    const todoDoc = doc(db, 'todos', id)

    await deleteDoc(todoDoc)
  }

  return (
    <>
      <div>{name}</div>
      <img src={photo} alt="" />

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

      <form onSubmit={handleTodoSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setNewTitle(e.target.value)
          }}
          value={newTitle}
        />
        <button>Add Todo</button>
      </form>

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
                    handleTodoUpdate(todo.id)
                  }}
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    handleTodoDelete(todo.id)
                  }}
                >
                  Delete
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
