import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJwtToken } from '../../helpers/jwt'
import humps from 'humps'

const Home = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  let headers = {}

  useEffect(() => {
    const token = getJwtToken()
    if (!token) navigate('/login')
    else headers['Authorization'] = `Bearer ${token}`

    fetch('http://localhost:3000/api/posts')
      .then((res) => res.json())
      .then((data) => setArticles(humps.camelizeKeys(data.data)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className='text-center text-3xl p-4'>Home</h1>
      <p className='mx-5'>This is the homepage la la la</p>
      {articles && articles.map((article) => <h2 key={article.id}>{article.title}</h2>)}
    </div>
  )
}

export default Home
