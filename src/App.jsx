import './App.css'
import { useEffect, useState, createContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'
import FetchData from './helpers/fetch'

export const Context = createContext(null)

function App() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  // ? Change: Conditional allows logout screen without redirect to /posts caused by failed refresh
  useEffect(() => {
    if (window.location.pathname === '/logout') return
    refreshAccessToken()
  }, [])

  function authRedirect(newUser) {
    if (newUser) {
      setUser(newUser)
    } else {
      setUser(null)
      navigate('/login')
    }
  }
  async function refreshAccessToken() {
    const res = await FetchData('/api/auth/refresh', 'POST')
    if (res.ok) {
      const data = await res.json()
      console.log(data.user)
      authRedirect(data.user)
    } else {
      // const data = await res.json()
      // setError({ status: res.status, message: data.message })
      authRedirect()
    }
  }

  if (error) throw new Response('', { status: error.status, statusText: error.msg })

  return (
    <Context.Provider value={{ user, posts, setPosts, authRedirect, refreshAccessToken }}>
      <Navbar />
      <Outlet />
      <Footer />
    </Context.Provider>
  )
}

export default App
