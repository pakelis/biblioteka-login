import React from 'react'
import Login from './Login'
import Signup from './Signup'

//Material
import {Container, CssBaseline, Grid} from '@material-ui/core'
import OverlayLogin from './OverlayLogin'
import OverlaySignUp from './OverlaySignUp'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  '@global': {
    boxSizing: 'border-box',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: '#aaaaaa',
  },
  panels: {
    display: 'flex',
    // backgroundColor: 'yellow',
  },
}))

export default function LoginSignup() {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <div className={classes.panels}>
        <Login />
        {/* <OverlayLogin /> */}
      </div>
      <div className={classes.panels}>
        {/* <Signup /> */}
        <OverlaySignUp />
      </div>
    </Container>
  )
}
