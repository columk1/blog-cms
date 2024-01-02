import './App.css'
import { useEffect, useState, createContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'

export const Context = createContext({
  username: null,
  posts: null,
  authRedirect: () => {},
  refreshAccessToken: () => {},
})

function App() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(null)
  const navigate = useNavigate()

  // ? Change: Conditional allows logout screen without redirect to /posts caused by failed refresh
  useEffect(() => {
    if (window.location.pathname === '/logout') return
    refreshAccessToken()
  }, [])

  function authRedirect(user) {
    if (user) {
      setUser(user)
      // navigate('/posts')
    } else {
      setUser(null)
      navigate('/login')
    }
  }

  async function refreshAccessToken() {
    fetch('http://localhost:3000/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status !== 200) {
        res.json().then((data) => {
          console.log(data.message)
          throw new Error(res.statusText)
        })
      }
      res
        .json()
        .then((data) => {
          console.log(data.user)
          authRedirect(data.user)
        })
        .catch((err) => {
          console.log(err)
          authRedirect()
        })
    })
  }

  return (
    <Context.Provider value={{ user, posts, setPosts, authRedirect, refreshAccessToken }}>
      <Navbar />
      <Outlet />
      <Footer />
    </Context.Provider>
  )
}

export default App
