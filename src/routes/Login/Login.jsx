import { useContext } from 'react'
import { Context } from '../../App'
import useForm from '../../helpers/useForm'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../../components/LoginForm/LoginForm'

const Login = () => {
  const { authRedirect } = useContext(Context)
  const { handleSubmit, status, message, data } = useForm()

  const navigate = useNavigate()

  if (status === 'success') {
    // console.log('This is the login log: ' + data.user)
    authRedirect(data.user)
    setTimeout(() => navigate('/posts'), 300)
  }

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
        
      {status === 'success' ? (
            <div className='text-2xl text-center font-bold'>👍 {message}</div>
          ) : (
            <>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-10 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Your Company'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <LoginForm handleSubmit={handleSubmit} status={status}errorMessage={message} />
        </div>
        </>
        )}
      </div>
    </>
  )
}

export default Login
