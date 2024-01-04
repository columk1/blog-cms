import { useContext } from 'react'
import { Context } from '../../App'

const Profile = () => {
  const { user } = useContext(Context)
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
      <h1 className='text-center font-bold p-4'>Author: {user}</h1>
    </div>
  )
}

export default Profile
