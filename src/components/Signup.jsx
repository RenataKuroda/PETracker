import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

import './Signup.css'

const SignUp = () => {
  const { register } = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    register({ email: emailRef.current.value, password: passwordRef.current.value })
    }
  

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        <button type="submit">Sign up</button>
      </form>

      <p className="message">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  )
}

export default SignUp