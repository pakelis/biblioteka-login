import React, {useCallback, useContext} from 'react'
import {withRouter, Redirect} from 'react-router'
import app from '../firebase'
import {AuthContext} from '../Auth'

const Login = ({history}) => {
  //history prop we get useing withRouter
  const handleLogin = useCallback(
    async event => {
      event.preventDefault()
      const {email, password} = event.target.elements
      try {
        await app.auth().signInWithEmailAndPassword(email.value, password.value)
        //we get history from props so we can redirect to different route
        history.push('/')
      } catch (error) {
        alert(error)
      }
    },
    [history],
  )

  const {currentUser} = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <br />
        <label>
          password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default withRouter(Login)
