import LoginFormWrapper from '../../components/LoginFormWrapper/LoginFormWrapper'
import { useOutletContext } from 'react-router-dom'

const Login = () => {
  const { redirectIfUser } = useOutletContext()
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html className="h-full bg-white">
        <body className="h-full">
        ```
      */}

      <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
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
          <LoginFormWrapper loginUser={redirectIfUser} />
        </div>
      </div>
    </>
  )
}

export default Login
