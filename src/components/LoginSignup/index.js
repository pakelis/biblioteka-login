import React from 'react'
import Login from './Login'
import Signup from './Signup'
import classNames from 'classnames'

//Material
import {Box, Container, CssBaseline, Grid} from '@material-ui/core'
import OverlayLogin from './OverlayLogin'
import OverlaySignUp from './OverlaySignUp'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  '@global': {
    boxSizing: 'border-box',
    padding: '0',
    margin: '0',
    body: {
      backgroundColor: theme.palette.lightShade.main,
    },
  },
  boxShadow: {
    display: 'flex',
  },
  container: {
    margin: '50px auto',
    // border: '3px solid black',
    height: '70vh',
    width: '50%',
    maxWidth: '100%',
    position: 'relative',
    overflow: 'hidden',
    minWidth: '520px',

    display: 'flex',
  },
  formContainer: {
    backgroundColor: '#aaa',
    position: 'absolute',
    top: '0',
    height: '100%',
    width: '50%',
    overflow: 'hidden',
  },
  overlayContainer: {
    backgroundColor: '#ddd',
    position: 'absolute',
    top: '0',
    left: '50%',
    height: '100%',
    width: '50%',
  },
  overlay: {
    backgroundColor: 'yellow',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    bakcgroundPosition: '0 0',
    color: '#fff',
    position: 'relative',
    left: '-100%',
    height: '100%',
    width: '200%',
    // transform: 'translateX(0)'
    // transition: 'transform 0.6s ease-in-out'
  },
  overlayPanel: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    top: '0',
    height: '100%',
    width: '50%',
    // transition: 'transform 0.6s ease-in-out',
  },
  overlayLeft: {
    //transform: translateX(-20%)
  },
  overlayRight: {
    right: '0',
    // transform: 'translateX(0)'
  },
  signUpContainer: {
    // backgroundColor: 'yellow',
    left: '0',
    width: '50%',
    opacity: '0',
    zIndex: '1',
  },
  signInContainer: {
    // backgroundColor: 'orange',
    left: '0',
    width: '50%',
    zIndex: '2',
  },
}))

export default function LoginSignup() {
  const classes = useStyles()

  return (
    <Box component="div" boxShadow="3" className={classes.container}>
      <div
        className={classNames(classes.formContainer, classes.signUpContainer)}
      >
        <Signup />
      </div>
      <div
        className={classNames(classes.formContainer, classes.signInContainer)}
      >
        <Login />
      </div>
      <div className={classNames(classes.overlayContainer)}>
        <div className={classes.overlay}>
          <div
            className={classNames(classes.overlayPanel, classes.overlayLeft)}
          >
            <OverlayLogin />
          </div>
          <div
            className={classNames(classes.overlayPanel, classes.overlayRight)}
          >
            <OverlaySignUp />
          </div>
        </div>
      </div>
    </Box>
  )
}
