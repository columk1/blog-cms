import { useEffect, useState } from 'react'

const API_DOMAIN =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PROD_API
    : import.meta.env.VITE_DEV_API

const Logout = () => {
  const [error, setError] = useState(null)

  if (error) throw error

  useEffect(() => {
    fetch(`${API_DOMAIN}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status !== 204) {
        setError(res)
      } else {
        console.log('logged out')
      }
    })
  }, [])

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
      <h1 className='text-center font-bold p-4'>You have logged out</h1>
    </div>
  )
}

export default Logout
