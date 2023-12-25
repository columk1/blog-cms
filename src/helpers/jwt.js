// Short duration JWT token (5-10 min)
export function getJwtToken() {
  return sessionStorage.getItem('jwt')
}

export function setJwtToken(token) {
  sessionStorage.setItem('jwt', token)
}

// Longer duration refresh token (30-60 min)
export function getRefreshToken() {
  return sessionStorage.getItem('refreshToken')
}

export function setRefreshToken(token) {
  sessionStorage.setItem('refreshToken', token)
}

// async function handleLogin({ email, password }) {
// Call login method in API
// The server handler is responsible for setting user fingerprint cookie during this as well

//   const { jwtToken, refreshToken } = await login({ email, password })
//   setJwtToken(jwtToken)
//   setRefreshToken(refreshToken)

// If you like, you may redirect the user now

//   Router.push("/some-url")
// }
