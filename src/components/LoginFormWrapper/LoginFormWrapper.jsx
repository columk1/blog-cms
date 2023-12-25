import useForm from '../../helpers/useForm'
import { setJwtToken } from '../../helpers/jwt'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm'

const LoginFormWrapper = () => {
  const navigate = useNavigate()
  const additionalData = {
    sent: new Date().toISOString(),
  }

  const { handleSubmit, status, message, data } = useForm({ additionalData })

  if (status === 'success') {
    setJwtToken(data.token)
    // setRefreshToken(data.refreshToken)
    setTimeout(() => navigate('/'), 500)
    return <div className='text-2xl text-center font-bold'>👍 {message}</div>
  } else {
    return <LoginForm handleSubmit={handleSubmit} errorMessage={message} />
  }
}

export default LoginFormWrapper
