import { useState, useEffect } from 'react'
import { useParams, useOutletContext, useLocation } from 'react-router-dom'
import he from 'he'
import Markdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Loading from '../../components/Loading/Loading'

SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('css', css)

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
  let markdown = he.decode(post.markdown)

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
          <p>{post.tags.map((tag) => tag.toUpperCase())}</p>
          <p>|</p>
          <p>{`${post.readingLength} MIN READ`}</p>
        </div>
        <div className='prose prose-lg prose-a:text-blue-600 prose-a:no-underline prose-pre:bg-[#1e1e1e]'>
          <Markdown
            children={markdown}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag='div'
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={vscDarkPlus}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                )
              },
            }}
          />
        </div>
      </div>
      <h1>This is an Individual Post</h1>
    </section>
  )
}

export default Post
