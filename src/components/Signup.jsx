import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const SignUp = () => {
  const { register } = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    register({ email: emailRef.current.value, password: passwordRef.current.value })
    // const { data, error } = await supabase.auth.signInWithPassword({
    //     email: 'example@email.com',
    //     password: 'example-password',
    //   })
    }
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        <button type="submit">Sign up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  )
}

export default SignUp