import { useState, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext(null)

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(null)

  const navigate = useNavigate()

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
        res
          .json()
          .then((data) => {
            console.log(data.message)
            throw new Error(data.message)
            // setError({ msg: res.statusText, status: res.status })
          })
          .catch((err) => {
            console.log(err)
            authRedirect()
          })
      } else {
        res.json().then((data) => {
          console.log(data.user)
          authRedirect(data.user)
        })
      }
    })
  }
  return (
    <UserContext.Provider value={{ user, posts, setPosts, authRedirect, refreshAccessToken }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  // Throw error if hook used outside of provider
  if (!context) {
    throw new Error('useCounterState must be within CounterProvider')
  }
  return context
}

export default UserContextProvider
