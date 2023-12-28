const FORM_ENDPOINT = 'http://localhost:3000/api/auth/login'
const LoginForm = ({ handleSubmit, errorMessage }) => {
  return (
    <form className='space-y-6' action={FORM_ENDPOINT} onSubmit={handleSubmit} method='POST'>
      <div className='flex flex-col mb-2'>
        {status === 'error' && (
          <div className='mb-3 text-red-500 text-center font-bold'>{errorMessage}</div>
        )}
        <div className='flex relative '>
          <span className='rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
              />
            </svg>
          </span>
          <input
            type='text'
            name='username'
            id='username'
            className=' rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
            placeholder='Your username'
            required
          />
        </div>
      </div>

      <div className='flex flex-col mb-6'>
        <div className='flex relative '>
          <span className='rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
              />
            </svg>
          </span>
          <input
            type='password'
            name='password'
            id='sign-in-email'
            className=' rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
            placeholder='Your password'
            required
          />
        </div>
      </div>
      <div className='flex items-center mb-6 -mt-4'>
        <div className='flex ml-auto'>
          <a
            href='#'
            className='inline-flex text-xs font-thin text-gray-500 sm:text-sm hover:text-gray-700'
          >
            Forgot Your Password?
          </a>
        </div>
      </div>
      <div>
        <button
          type='submit'
          className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Log in
        </button>
      </div>
    </form>
  )
}

export default LoginForm
