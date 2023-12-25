import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Login from './routes/Login/Login'
import Logout from './routes/Logout/Logout'
import Home from './routes/Home/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/logout', element: <Logout /> },
      // { path: '/posts/:postId', element: <Post /> },
      // { path: '/posts/:postId/edit', element: <EditPost /> },
      // { path: '/posts/new', element: <EditPost /> },
    ],
    // errorElement: <ErrorPage />,
  },
])

export default router
