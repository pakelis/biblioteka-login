import React, {useCallback} from 'react'
import {withRouter} from 'react-router'
import app from '../firebase'

const SignUp = ({history}) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault()
      //we get email and password with e.target.elements
      const {email, password} = event.target.elements
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
        history.push('/')
      } catch (error) {
        //More complicated in future
        alert(error)
      }
    },
    [history],
  )

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default withRouter(SignUp)
