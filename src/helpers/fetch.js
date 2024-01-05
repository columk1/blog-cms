const API_DOMAIN = mode === 'prod' ? import.meta.env.VITE_PROD_API : import.meta.env.VITE_DEV_API

const mode = 'dev'

export default async function fetchData(path, method, formData) {
  const options = {
    method,
    credentials: 'include',
    body: formData ? new URLSearchParams(formData) : null,
  }
  try {
    const res = await fetch(`${API_DOMAIN}${path}`, options)
    if (res.ok) {
      return res
    } else {
      if (res.status === 401) {
        const refresh = await fetch(`${API_DOMAIN}/api/auth/refresh`, 'POST')
        if (refresh.ok) {
          const retry = await fetch(`${API_DOMAIN}${path}`, options)
          return retry
        }
      }
    }
  } catch (err) {
    return err
  }
}
