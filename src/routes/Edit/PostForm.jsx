import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import he from 'he'

const PostForm = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { post } = useLocation().state
  const formRef = useRef(null)
  const markdownRef = useRef(null)

  const navigate = useNavigate()

  console.log(post)

  const categories = ['React', 'JavaScript', 'HTML', 'CSS', 'MongoDB']

  const savePost = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(formRef.current)
    // formData.set('markdown', he.escape(markdownRef.current.value))
    formData.set('tags', formData.getAll('tags'))

    console.log(formData.get('tags'))

    // const formData = Array.from(e.target.elements)
    //   .filter((input) => input.name)
    //   .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {})

    const res = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      // mode: 'cors',
      credentials: 'include',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
      body: new URLSearchParams(formData),
      // body: JSON.stringify(formData),
    })
    if (res.ok) {
      const newPost = (await res.json()).data
      console.log(newPost)
      navigate(`/posts/${newPost._id.toString()}`, { replace: true, state: { post: newPost } })
    } else {
      let error = await res.json()
      setError({ status: res.status, message: error.message })
      // setError({ status: res.status, message: res.statusText })
      setLoading(false)
    }
  }

  if (error) {
    console.log(error)
    // ? Could be worth refactoring server to send response instead of json message
    throw new Response('', { status: error.status, statusText: error.message })
  }

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

            <label className='flex flex-col gap-1'>
              <div>
                <span className='font-bold'>Markdown</span>
                <span className='text-red-500'>*</span>
              </div>
              <textarea
                ref={markdownRef}
                name='markdown'
                rows={20}
                className='rounded-lg flex-1 appearance-none leading-7 border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                defaultValue={post && he.decode(post.markdown)}
                required
              ></textarea>
            </label>

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
