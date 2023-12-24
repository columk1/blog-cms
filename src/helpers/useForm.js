import { useState } from 'react'

function useForm({ additionalData }) {
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    const formEndpoint = e.target.action
    const data = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {})

    if (additionalData) Object.assign(data, additionalData)

    fetch(formEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status !== 200) {
          res.json().then((data) => {
            setMessage(data.message)
            throw new Error(res.statusText)
          })
        }
        return res.json()
      })
      .then((data) => {
        setMessage(data.message)
        setStatus('success')
      })
      .catch((err) => {
        setStatus('error')
      })
  }
  return { handleSubmit, status, message }
}

export default useForm
