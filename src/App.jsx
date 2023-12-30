import './App.css'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

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
    <>
      <Navbar />
      <Outlet context={{ user, authRedirect }} />
      <Footer />
    </>
  )
}

export default App
