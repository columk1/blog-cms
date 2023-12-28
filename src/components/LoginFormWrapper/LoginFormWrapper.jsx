import useForm from '../../helpers/useForm'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm'

const LoginFormWrapper = ({ redirectIfUser }) => {
  const navigate = useNavigate()
  const additionalData = {
    sent: new Date().toISOString(),
  }

  const { handleSubmit, status, message, data } = useForm({ additionalData })

  if (status === 'success') {
    console.log('This is the login log: ' + data.user)
    redirectIfUser(data.user)
    // setTimeout(() => navigate('/posts'), 500)
    return <div className='text-2xl text-center font-bold'>👍 {message}</div>
  } else {
    return <LoginForm handleSubmit={handleSubmit} errorMessage={message} />
  }
}

export default LoginFormWrapper
