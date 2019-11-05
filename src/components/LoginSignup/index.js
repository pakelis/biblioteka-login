import React from 'react'
import Login from './Login'
import Signup from './Signup'
import classNames from 'classnames'
import {useState} from 'react'
//Spring

//Material
import {Box} from '@material-ui/core'
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
    height: '85vh',
    width: '60%',
    maxWidth: '100%',
    position: 'relative',
    overflow: 'hidden',
    minWidth: '520px',
    backgroundColor: '#fff',

    display: 'flex',
  },
  formContainer: {
    position: 'absolute',
    top: '0',
    height: '100%',
    transition: 'all 0.6s ease-in-out',
  },
  overlayContainer: {
    position: 'absolute',
    top: '0',
    left: '50%',
    height: '100%',
    width: '50%',
    overflow: 'hidden',
    transition: 'transform 0.6s ease-in-out',
    zIndex: '100',
  },
  overlay: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    bakcgroundPosition: '0 0',
    color: '#fff',
    position: 'relative',
    left: '-100%',
    height: '100%',
    width: '200%',
    transform: 'translateX(0)',
    transition: 'transform 0.6s ease-in-out',
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
    transform: 'translateX(0)',
    transition: 'transform 0.6s ease-in-out',
  },
  overlayLeft: {
    transform: 'translateX(-20%)',
  },
  containerRightPanelActiveOverlayLeft: {
    transform: 'translateX(0)',
  },
  overlayRight: {
    right: '0',
    transform: 'translateX(0)',
  },
  containerRightPanelActiveOverlayRight: {
    transform: 'translateX(20%)',
  },
  signUpContainer: {
    left: '0',
    width: '50%',
    opacity: '0',
    zIndex: '1',
  },
  signInContainer: {
    left: '0',
    width: '50%',
    zIndex: '2',
  },
  containerRightPanelActiveSignIn: {
    transform: 'translateX(100%)',
  },
  containerRightPanelActiveSignUp: {
    transform: 'translateX(100%)',
    opacity: '1',
    zIndex: '5',
    animation: 'show 0.6s',
  },
  '@keyframes show': {
    '0%, 49.99%': {
      opacity: '0',
      zIndex: '1',
    },
    '50%,100%': {
      opacity: '1',
      zIndex: '5',
    },
  },
  containerRightPanelActiveOverlayContainer: {
    transform: 'translateX(-100%)',
  },
  containerRightPanelActiveOverlay: {
    transform: 'translateX(50%)',
  },
}))

export default function LoginSignup() {
  const [toggle, setToggle] = useState(false)
  const classes = useStyles()

  const toggleHandler = () => {
    if (toggle) {
      setToggle(true)
    } else {
      setToggle(false)
    }
  }

  return (
    <Box component="div" boxShadow="3" className={classes.container}>
      <div>
        <div
          className={
            toggle
              ? classNames(
                  classes.formContainer,
                  classes.signUpContainer,
                  classes.containerRightPanelActiveSignUp,
                )
              : classNames(classes.formContainer, classes.signUpContainer)
          }
        >
          <Signup />
        </div>
        <div
          className={
            toggle
              ? classNames(
                  classes.formContainer,
                  classes.signInContainer,
                  classes.containerRightPanelActiveSignIn,
                )
              : classNames(classes.formContainer, classes.signInContainer)
          }
        >
          <Login />
        </div>
        <div
          className={
            toggle
              ? classNames(classes.overlayContainer)
              : classNames(
                  classes.overlayContainer,
                  classes.containerRightPanelActiveOverlayContainer,
                )
          }
        >
          <div
            className={
              toggle
                ? classNames(classes.overlay)
                : classNames(
                    classes.overlay,
                    classes.containerRightPanelActiveOverlay,
                  )
            }
          >
            <div
              className={
                toggle
                  ? classNames(classes.overlayPanel, classes.overlayLeft)
                  : classNames(
                      classes.overlayPanel,
                      classes.overlayLeft,
                      classes.containerRightPanelActiveOverlayLeft,
                    )
              }
            >
              <OverlayLogin toggleClick={toggleHandler} />
            </div>
            <div
              className={
                toggle
                  ? classNames(classes.overlayPanel, classes.overlayRight)
                  : classNames(
                      classes.overlayPanel,
                      classes.overlayRight,
                      classes.containerRightPanelActiveOverlayRight,
                    )
              }
            >
              <OverlaySignUp toggleClick={toggleHandler} />
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}
