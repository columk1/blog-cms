import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import ErrorPage from './routes/ErrorPage'
import Login from './routes/Login/Login'
import Logout from './routes/Logout/Logout'
import Profile from './routes/Profile/Profile'
import Posts from './routes/Posts/Posts'
import Post from './routes/Post/Post'
import PostForm from './routes/Edit/PostForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Navigate to='/posts' replace /> },
      { path: '/login', element: <Login /> },
      { path: '/logout', element: <Logout /> },
      { path: '/profile', element: <Profile /> },
      { path: '/posts', element: <Posts /> },
      { path: '/posts/new', element: <PostForm /> },
      { path: '/posts/:postId', element: <Post /> },
      { path: '/posts/:postId/edit', element: <PostForm /> },
    ],
    errorElement: <ErrorPage />,
    // ,
  },
])

export default router
