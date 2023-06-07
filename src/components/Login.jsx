import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import './Login.css'

const Login = () => {
  const { login } = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError('') 
      await login({ email: emailRef.current.value, password: passwordRef.current.value })
    } catch (err) {
      setError('Failed to login. Please check your email and password.') 
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        <button type="submit">Login</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <p className="message">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  )
}

export default Login
