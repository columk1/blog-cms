import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { Context } from '../../App'
import Loading from '../../components/Loading/Loading'

const Posts = () => {
  // const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user, posts, setPosts, refreshAccessToken } = useContext(Context)
  const { message } = useNavigate().state | {}

  const navigate = useNavigate()

  async function togglePublish(postId, publish) {
    const res = await fetch(`http://localhost:3000/api/posts/${postId}?publish=${publish}`, {
      method: 'PATCH',
      credentials: 'include',
    })
    if (res.status === 401) {
      const refreshRes = await refreshAccessToken()
      console.log({ refreshRes })
      if (refreshRes.ok) {
        return togglePublish(postId)
      } else {
        setError({ status: refreshRes.status, message: refreshRes.statusText })
        return
      }
    }
    if (res.ok) {
      setPosts(posts.map((post) => (post.id === postId ? { ...post, isPublished: publish } : post)))
      navigate(`/posts`, {
        replace: true,
        state: { message: 'Publish status updated' },
      })
    } else {
      let error = await res.json()
      console.log(error)
      setLoading(false)
      setError({ status: res.status, message: error.errors[0].msg })
      // setError({ status: res.status, message: res.statusText })
    }
  }

  useEffect(() => {
    console.log({ user })
    if (!posts) {
      console.log('Fetching')
      fetch('http://localhost:3000/api/posts')
        .then((res) => res.json())
        // .then((data) => setPosts(humps.camelizeKeys(data.data)))
        .then((data) => {
          setPosts(data)
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [posts])

  console.log({ posts })

  return loading ? (
    <Loading />
  ) : (
    <div className='flex min-h-full min-w-[720px] mx-auto flex-1 flex-col justify-center px-6 lg:px-8'>
      {/* Display message deleted on successful delete */}
      {message && <div className='text-center text-3xl p-4'>{message}</div>}
      <h1 className='text-center text-3xl p-4'>Home</h1>
      {/* <div className='sm:mx-auto sm:w-full sm:max-w-sm'> */}
      <ul className='max-w-screen-md divide-y  divide-gray-200'>
        <li className='py-3 sm:py-4'>
          <div className='flex items-center space-x-4 rtl:space-x-reverse'>
            <div className='flex-shrink-0'>
              {/* Image placeholder: <div className='w-11 h-11 rounded-full' src='' alt='' /> */}
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-lg font-bold text-gray-900 truncate'>Title / Author</p>
            </div>
            <div className='inline-flex gap-0 items-center text-lg font-bold text-gray-900'>
              <div className='min-w-16'>Date</div>
              <div className='w-24 text-center'>Publish</div>
            </div>
          </div>
        </li>
        {posts.map((post) => (
          <li className='py-3 sm:py-4' key={post.id}>
            <div className='flex items-center space-x-4 rtl:space-x-reverse'>
              <div className='flex-shrink-0'>
                {/* Image placeholder: <img className='w-11 h-11 rounded-full' src={post.imageUrl} alt='Article Image' /> */}
              </div>
              <Link to={post.id} state={{ loadedPost: post }} className='flex-1 min-w-0'>
                <p className='text-lg font-medium text-gray-900 truncate'>{post.title}</p>
                <p className='text-sm text-gray-500 truncate'>{post.author.username}</p>
              </Link>
              <div className='inline-flex gap-4 items-center text-base text-gray-900'>
                <div className='min-w-16'>{post.formattedDate}</div>
                <label className='relative w-20 inline-flex items-center cursor-pointer'>
                  <input
                    onClick={(e) => togglePublish(post.id, e.target.checked)}
                    type='checkbox'
                    readOnly
                    value=''
                    className='sr-only peer'
                    checked={post.isPublished}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'></span>
                </label>
                {/* <div className='w-20 text-center'>{post.isPublished ? '✅' : '❌'}</div> */}
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
