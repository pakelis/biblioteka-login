import React, {useCallback, useContext} from 'react'
import {withRouter, Redirect} from 'react-router'
import app from '../firebase'
import {AuthContext} from '../Auth'
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Link,
  Container,
  CssBaseline,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = ({history}) => {
  //history prop we get using withRouter
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

  const classes = useStyles()
  const {currentUser} = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          Log in
        </Typography>
        <form onSubmit={handleLogin} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default withRouter(Login)
