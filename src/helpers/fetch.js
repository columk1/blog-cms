const API_DOMAIN =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PROD_API
    : import.meta.env.VITE_DEV_API

const refreshOptions = {
  method: 'POST',
  credentials: 'include',
}

export default async function fetchData(path, method, formData) {
  const options = {
    method,
    credentials: 'include',
    body: formData ? new URLSearchParams(formData) : null,
  }
  const isAuthRequest = path.startsWith('/api/auth/')
  try {
    const res = await fetch(`${API_DOMAIN}${path}`, options)
    if (res.ok || isAuthRequest) {
      return res
    } else {
      if (res.status === 401) {
        const refresh = await fetch(`${API_DOMAIN}/api/auth/refresh`, refreshOptions)
        if (refresh.ok) {
          const retry = await fetch(`${API_DOMAIN}${path}`, options)
          return retry
        } else {
          console.log('Refresh failed, redirect to login')
        }
        // Not ok or 401, still return the response for error handling in the calling function
      } else {
        return res
      }
    }
  } catch (err) {
    return err
  }
}
