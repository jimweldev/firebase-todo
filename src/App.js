import { auth } from './firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from './components/Loading/Loading'
import Login from './components/Login/Login'
import User from './components/User/User'

function App() {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return <Login />
  }

  return <User />
}

export default App
