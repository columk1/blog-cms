import { useState } from 'react'

function useForm({ additionalData }) {
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [data, setData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    const formEndpoint = e.target.action
    const formData = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {})

    if (additionalData) Object.assign(formData, additionalData)

    fetch(formEndpoint, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        // Go a little further and get the data before throwing an error since it contains custom messages
        if (res.status !== 200) {
          res.json().then((data) => {
            setMessage(data.message)
            throw new Error(res.statusText)
          })
        }
        setData(res.headers.get('authorization'))
        return res.json()
      })
      .then((data) => {
        setMessage(data.message)
        setData(data)
        setStatus('success')
      })
      .catch((err) => {
        setStatus('error')
      })
  }
  return { handleSubmit, status, message, data }
}

export default useForm
