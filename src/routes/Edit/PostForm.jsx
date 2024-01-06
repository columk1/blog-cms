import { useState, useRef, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import fetchData from '../../helpers/fetch'
import Loading from '../../components/Loading/Loading'
import MarkdownEditor from '../../components/MarkdownEditor/MarkdownEditor'
import he from 'he'
import { Context } from '../../App'

const PostForm = () => {
  const { post } = useLocation().state || {}
  const [markdown, setMarkdown] = useState(post?.markdown || '')
  const { posts, setPosts } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const formRef = useRef(null)
  // const markdownRef = useRef(null)

  const navigate = useNavigate()

  const categories = ['React', 'JavaScript', 'HTML', 'CSS', 'MongoDB']

  const savePost = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(formRef.current)
    formData.set('tags', formData.getAll('tags'))

    // const formData = Array.from(e.target.elements)
    //   .filter((input) => input.name)
    //   .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {})

    const res = await fetchData(
      '/api/posts' + (post ? `/${post.id}` : ''),
      post ? 'PUT' : 'POST',
      formData
    )
    if (res.ok) {
      const newPost = await res.json()
      // console.log(newPost)
      setPosts(posts.map((post) => (post.id === newPost.id ? newPost : post)))
      navigate(`/posts/${newPost.id}`, {
        replace: true,
        state: { loadedPost: newPost },
      })
    } else {
      console.log(res)
      const error = await res.json()
      console.log(error)
      setError({ status: res.status, message: error.message })
      setLoading(false)
    }
  }

  const handleChange = (e) => setMarkdown(e.target.value)

  // if (error) {
  //   console.log(error)
  //   // ? Could be worth refactoring server to send response instead of json message
  //   throw new Response('', { status: error.status, statusText: error.message })
  // }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section
          id='post'
          className='flex min-h-full w-[min(95vw,_880px)] mx-auto flex-1 flex-col justify-center px-6 lg:px-8'
        >
          {error && (
            <div className='flex flex-col items-center mt-12'>
              <h2 className='text-3xl'>Error</h2>
              <h3 className='text-2xl'>{error.status + ' - ' + error.message}</h3>
            </div>
          )}
          <form
            onSubmit={savePost}
            className='flex flex-col gap-6 mt-14 mb-14 bg-white '
            ref={formRef}
          >
            <div className='space-y-3 text-center'>
              <h1 className='text-3xl text-center font-bold'>
                {post ? `${post.title}` : 'New post'}
              </h1>
              <p className='text-sm italic'>
                Fields marked with <span className='text-red-500'>*</span> are required
              </p>
            </div>

            <label className='flex flex-col gap-1'>
              <div>
                <span className='font-bold'>Title</span>
                <span className='text-red-500'>*</span>
              </div>
              <input
                name='title'
                type='text'
                className='rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                defaultValue={post && post.title}
                required
              />
            </label>

            <label className='flex flex-col gap-1'>
              <div>
                <span className='font-bold'>Description</span>
                <span className='text-red-500'>*</span>
              </div>
              <textarea
                name='description'
                rows={2}
                className='rounded-lg flex-1 appearance-none leading-7 border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                defaultValue={post && he.decode(post.description)}
                required
              ></textarea>
            </label>

            <label className='flex flex-col gap-1'>
              <span className='font-bold'>Image URL</span>
              <input
                name='imageUrl'
                type='text'
                className='rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                defaultValue={post && post.imageUrl}
              />
            </label>

            <label className='flex flex-col gap-1'>
              <span className='font-bold'>Image Credit</span>
              <input
                name='imgCredit'
                type='text'
                className='rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                defaultValue={post && post.imageCredit}
              />
            </label>

            <fieldset className='flex gap-6'>
              <legend className='mb-1'>
                <span className='font-bold'>Tags</span>
                <span className='text-red-500'>*</span>
              </legend>
              {categories.map((category) => (
                <div key={category} className='flex gap-2 items-center'>
                  <input
                    id={category}
                    type='checkbox'
                    name='tags'
                    value={category}
                    defaultChecked={post && post.tags.includes(category) ? 'checked' : ''}
                    className='rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </fieldset>

            <MarkdownEditor markdownStr={markdown} onChange={handleChange} />

            <div className='flex items-center'>
              <label className='flex items-center gap-2'>
                <input
                  name='isPublished'
                  type='checkbox'
                  className='rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                  defaultChecked={post && post.isPublished}
                />
                <span className='font-bold'>Publish Post</span>
              </label>
            </div>

            <button className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              {post ? 'Save' : 'Create Post'}
            </button>
          </form>
        </section>
      )}
    </>
  )
}

export default PostForm
