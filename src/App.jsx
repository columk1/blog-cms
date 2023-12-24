import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Header/Navbar'
import Login from './routes/Login/Login'
import Logout from './routes/Logout/Logout'
import Home from './routes/Home/Home'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className='w-screen h-screen bg-purple-100'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/logout' element={<Logout />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
