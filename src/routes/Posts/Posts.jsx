import { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { getJwtToken } from '../../helpers/jwt'
import humps from 'humps'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user, setUser } = useOutletContext()

  useEffect(() => {
    console.log({ user })
    if (!user) navigate('/login')

    fetch('http://localhost:3000/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(humps.camelizeKeys(data.data)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className='flex min-h-full min-w-[720px] mx-auto flex-1 flex-col justify-center px-6 lg:px-8'>
      <h1 className='text-center text-3xl p-4'>Home</h1>
      {/* <div className='sm:mx-auto sm:w-full sm:max-w-sm'> */}
      <ul className='max-w-screen-md divide-y  divide-gray-200'>
        <li className='py-3 sm:py-4'>
          <div className='flex items-center space-x-4 rtl:space-x-reverse'>
            <div className='flex-shrink-0'>
              <div className='w-11 h-11 rounded-full' src='' alt='' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-lg font-bold text-gray-900 truncate'>Title / Author</p>
            </div>
            <div className='inline-flex gap-2 items-center text-lg font-bold text-gray-900'>
              <div className='min-w-16'>Date</div>
              <div className='w-20 text-center'>Published</div>
            </div>
          </div>
        </li>
        {posts.map((post) => (
          <li className='py-3 sm:py-4' key={post.id}>
            <div className='flex items-center space-x-4 rtl:space-x-reverse'>
              <div className='flex-shrink-0'>
                <img className='w-11 h-11 rounded-full' src={post.imageUrl} alt='Article Image' />
              </div>
              <Link to={post.id} state={{ post: post }} className='flex-1 min-w-0'>
                <p className='text-lg font-medium text-gray-900 truncate'>{post.title}</p>
                <p className='text-sm text-gray-500 truncate'>{post.author.username}</p>
              </Link>
              <div className='inline-flex gap-2 items-center text-base text-gray-900'>
                <div className='min-w-16'>{post.formattedDate}</div>
                <div className='w-20 text-center'>{post.isPublished ? '✅' : '❌'}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    // </div>
  )
}

export default Posts
