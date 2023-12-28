import './App.css'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    refreshAccessToken()
  }, [])

  function redirectIfUser(user) {
    if (user) {
      setUser(user)
      navigate('/posts')
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
          redirectIfUser(data.user)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  return (
    <>
      <Navbar />
      <Outlet context={{ user, redirectIfUser }} />
      <Footer />
    </>
  )
}

export default App
