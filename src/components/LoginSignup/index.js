import React from 'react'
import Login from './Login'
import Signup from './Signup'
import MaterialExample from './MaterialExample'

//Material
import {Container, CssBaseline, Grid, Paper} from '@material-ui/core'
import OverlayLogin from './OverlayLogin'
import OverlaySignUp from './OverlaySignUp'
import {makeStyles} from '@material-ui/styles'

export default function LoginSignup() {
  return (
    <div component="main" className="container">
      <Login />
      <Signup />
      <div className="overlay-container">
        <div className="overlay">
          <OverlayLogin />
          <OverlaySignUp />
        </div>
      </div>
    </div>
  )
}
