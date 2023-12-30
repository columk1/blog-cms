import { useState, useEffect } from 'react'
import { useParams, useOutletContext, useLocation } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import Markdown from '../../components/Markdown/Markdown'

const Post = () => {
  const { loadedPost } = useLocation().state
  const [loading, setLoading] = useState(false)

  // const [post, setPost] = useState(null)

  // useEffect(() => {
  //   if (!post && loadedPost) {
  //     setPost(loadedPost)
  //   } else {
  //     // const id = useParams().postId
  //     // const post = posts.find((post) => post.id == id)
  //     console.log('No Post')
  //   }
  //   if (post) {
  //     let markdown = he.decode(post.markdown)
  //     setLoading(false)
  //   }
  // })
  const post = loadedPost

  return loading ? (
    <Loading />
  ) : (
    <section
      id='post'
      className='flex min-h-full w-[min(95vw,_880px)] mx-auto flex-1 flex-col justify-center px-6 lg:px-8'
    >
      <div className='w-11/12'>
        <img className='w-full object-contain' src={post.imageUrl} alt={post.title} />
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
