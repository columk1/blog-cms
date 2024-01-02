import { useRouteError, Link } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
      <div className='mx-auto max-w-md text-center'>
        <h1 className='text-xl text-center font-bold p-4'>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className='m-6 text-gray-900'>
          <p className='text-xl font-bold'>{error.status}</p>
          <i className='text-xl text-inherit'>{error.statusText || error.message}</i>
        </p>
        <Link className='text-blue-500' to='/'>
          You can go back to the home page by clicking here, though!
        </Link>
      </div>
    </div>
  )
}
