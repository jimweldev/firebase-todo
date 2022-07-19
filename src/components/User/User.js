import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import {
  collection,
  onSnapshot,
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
import './User.css'

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
  const handleTodoUpdate = async (id, status) => {
    status = status === 'pending' ? 'finished' : 'pending'

    const todoDoc = doc(db, 'todos', id)
    const newFields = { status: status }

    await updateDoc(todoDoc, newFields)
  }

  // todo delete
  const handleTodoDelete = async (id) => {
    const todoDoc = doc(db, 'todos', id)

    await deleteDoc(todoDoc)
  }

  return (
    <div className="container">
      <div className="d-flex">
        <div className="d-flex">
          <img src={photo} alt="" />
          <div className="name">{name}</div>
        </div>

        <button
          onClick={() => {
            signOut(auth)
          }}
        >
          Sign out
        </button>
      </div>

      <form
        className="d-flex"
        style={{ marginTop: '40px', marginBottom: '40px' }}
        onSubmit={handleTodoSubmit}
      >
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
        <div className="empty">No Todos (ﾒ﹏ﾒ)</div>
      ) : (
        todos.map((todo) => {
          return (
            <div
              className={`todo ${todo.status == 'finished' && 'finished'}`}
              key={todo.id}
              onDoubleClick={() => {
                handleTodoUpdate(todo.id, todo.status)
              }}
            >
              <div>
                <div className="title">{todo.title}</div>
              </div>
              <div>
                <button
                  className="delete"
                  onClick={() => {
                    handleTodoDelete(todo.id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default User
