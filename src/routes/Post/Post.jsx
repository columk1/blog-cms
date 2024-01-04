import { useState, useEffect, useContext } from 'react'
import { useParams, useOutletContext, useLocation, useNavigate, Link } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import Markdown from '../../components/Markdown/Markdown'
import { Context } from '../../App'

const Post = () => {
  const { loadedPost } = useLocation().state
  const [post, setPost] = useState(loadedPost)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { posts, setPosts, refreshAccessToken } = useContext(Context)

  async function handleDelete(postId) {
    const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (res.status === 401) {
      await refreshAccessToken()
      return handleDelete(postId)
    }
    if (res.ok) {
      setPosts(posts.filter((post) => post.id !== postId))
      navigate(`/posts`, {
        replace: true,
        state: { message: 'Post deleted' },
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
    console.log('use effect' + loadedPost)
    if (!post) {
      setPost(loadedPost)
      setLoading(false)
    } else {
      // const id = useParams().postId
      // const post = posts.find((post) => post.id == id)
      console.log('No Post')
    }
    // if (post) {
    //   // let markdown = he.decode(post.markdown)

    // }
  }, [loadedPost])
  // const post = loadedPost
  console.log({ loadedPost })
  console.log(post)

  // if (!post) throw new Response('Server Error', { status: 500 })

  return loading ? (
    <Loading />
  ) : (
    <section
      id='post'
      className='flex min-h-full w-[min(95vw,_880px)] mx-auto flex-1 flex-col px-6 lg:px-8'
    >
      {/* Temporary button to test editing page */}
      <div className='w-11/12'>
        {post.imageUrl && (
          <img className='w-full object-contain' src={post.imageUrl} alt={post.title} />
        )}
      </div>
      <div className='flex w-11/12 justify-left gap-4'>
        <Link to={'edit'} state={{ post: post }} className='min-w-0'>
          <button className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            Edit Post
          </button>
        </Link>
        <button
          onClick={() => handleDelete(post.id)}
          className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Delete Post
        </button>
      </div>
      <div className='w-11/12'>
        <div className='mx-auto'>
          <h2 className='mt-4 text-3xl font-bold text-gray-800'>{post.title}</h2>
          <p className='mb-2 text-sm text-gray-500'>{post.formattedDate}</p>
        </div>
        <div className='mb-6 flex gap-2 text-sm'>
          <p>{post.tags.map((tag) => tag.toUpperCase()).join(', ')}</p>
          <p>|</p>
          <p>{`${post.readingLength} MIN READ`}</p>
        </div>
        <div className='prose prose-lg prose-a:text-blue-600 prose-a:no-underline prose-pre:bg-[#1e1e1e]'>
          <Markdown markdownString={post.markdown} />
        </div>
      </div>
    </section>
  )
}

export default Post
