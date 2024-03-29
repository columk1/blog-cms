import { useState, useEffect, useContext } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import Markdown from '../../components/Markdown/Markdown'
import { Context } from '../../App'
import fetchData from '../../helpers/fetch'
import he from 'he'

const Post = () => {
  const { loadedPost } = useLocation().state
  const { posts, setPosts } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Posts escaped on back-end and decoded here to display markdown
  const post = { ...loadedPost, markdown: he.decode(loadedPost.markdown) }

  const navigate = useNavigate()

  async function handleDelete(postId) {
    const res = await fetchData(`/api/posts/${postId}`, 'DELETE')
    if (res.ok) {
      setPosts(posts.filter((post) => post.id !== postId))
      navigate(`/posts`, {
        replace: true,
        state: { message: 'Post deleted' },
      })
    } else {
      let error = await res.json()
      console.log(error)
      setError({ status: res.status, message: error.message })
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   if (!post) {
  //     setPost(loadedPost)
  //     setLoading(false)
  //   } else {
  //     // const id = useParams().postId
  //     // const post = posts.find((post) => post.id == id)
  //   }
  // }, [])

  if (error) throw new Response('', { status: error.status, statusText: error.message })

  return loading ? (
    <Loading />
  ) : (
    <section
      id='post'
      className='flex min-h-full w-[min(95vw,_880px)] mx-auto flex-1 flex-col px-6 lg:px-8'
    >
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
        <div className='prose prose-lg prose-a:text-blue-600 prose-a:no-underline prose-pre:p-2 prose-pre:bg-[#1e1e1e]'>
          <Markdown markdownString={post.markdown} />
        </div>
      </div>
    </section>
  )
}

export default Post
