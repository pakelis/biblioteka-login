import React from 'react'
import Login from './Login'
import Signup from './Signup'
import classNames from 'classnames'
import {useState} from 'react'
//Spring
import {useSpring, animated} from 'react-spring'
import {config} from 'react-spring'
import {Keyframes} from 'react-spring/renderprops'

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
    // border: '3px solid black',
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
    // backgroundColor: '#fff',
    position: 'absolute',
    top: '0',
    height: '100%',
    width: '50%',
    overflow: 'hidden',
    transition: `all 0.6s ease-in-out`,
  },
  overlayContainer: {
    // backgroundColor: '#fff',
    position: 'absolute',
    top: '0',
    left: '50%',
    height: '100%',
    width: '50%',
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
    transform: `translateX(0)`,
    transition: `transform 0.6s ease-in-out`,
  },
  overlayLeft: {
    // transform: `translateX(-20%)`,
  },
  overlayRight: {
    right: '0',
    zIndex: 5,
    // transform: 'translateX(0)'
  },
  signUpContainer: {
    // backgroundColor: '#fff',
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
  const [toggle, setToggle] = useState(true)
  const classes = useStyles()

  const toggleHandler = () => {
    if (toggle) {
      setToggle(false)
    } else {
      setToggle(true)
    }
  }

<<<<<<< HEAD
=======
  const signUpOverlay = useSpring({
    // transform: toggle ? `translateX(-100%)` : `translateX(0%)`,
    config: {duration: 500},
  })
  const signInOverlay = useSpring({
    config: {duration: 500},
  })
  const signIn = useSpring({
    config: {duration: 500},
  })
  const signUp = useSpring({
    from: {opacity: '0', zIndex: '1'},
    to: async next => {
      while (true)
        await next({opacity: '1', zIndex: '5', transform: 'translateX(100%)'})
    },
  })

>>>>>>> c622aec7b3e842790440440addbb7a4c09c390bf
  return (
    <Box component="div" boxShadow="3" className={classes.container}>
      <div>
        <div
          className={
            toggle
              ? classNames(classes.formContainer, classes.signUpContainer)
              : classNames(
                  classes.formContainer,
                  classes.signUpContainer,
                  classes.containerRightPanelActiveContainer,
                )
          }
        >
          <Signup />
        </div>
        <div
          className={
            toggle
              ? classNames(classes.formContainer, classes.signInContainer)
              : classNames(
                  classes.formContainer,
                  classes.signInContainer,
                  classes.containerRightPanelActiveSignInContainer,
                )
          }
        >
          <Login />
        </div>
        <div className={classNames(classes.overlayContainer)}>
          <div className={classes.overlay}>
            <div
              className={classNames(classes.overlayPanel, classes.overlayLeft)}
            >
              <OverlayLogin toggleClick={toggleHandler} />
            </div>
            <div
              className={classNames(classes.overlayPanel, classes.overlayRight)}
            >
              <OverlaySignUp toggleClick={toggleHandler} />
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}
