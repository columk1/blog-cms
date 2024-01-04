import { useState, createContext, useContext } from 'react'

const PostsStateContext = createContext(null)

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(null)
  return (
    <PostsStateContext.Provider value={{ posts, setPosts }}>{children}</PostsStateContext.Provider>
  )
}

export function usePostsState() {
  const context = useContext(PostsStateContext)
  // Throw error if hook used outside of provider
  if (!context) {
    throw new Error('useCounterState must be within CounterProvider')
  }
  return context
}

export default PostsProvider
