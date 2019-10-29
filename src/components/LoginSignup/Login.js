import React, {useCallback, useContext} from 'react'
import {withRouter, Redirect} from 'react-router'
import {NavLink} from 'react-router-dom'
import app from '../../firebase'
import {AuthContext} from '../../Auth'
import {shadows} from '@material-ui/system'
import Box from '@material-ui/core/Box'
import {MemoryRouter as Router} from 'react-router'
import {Link as RouterLink} from 'react-router-dom'
//TODO i need to make all buttons , textfields same css to look sharp and clean so i dont have to repeat

//MATERIAL
import InputAdornment from '@material-ui/core/InputAdornment'
import LockIcon from '@material-ui/icons/Lock'
import EmailIcon from '@material-ui/icons/Email'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Container,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
} from '@material-ui/core'

const Link1 = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/signup" {...props} />
))

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

  //Using styles hook from material
  // const classes = useStyles()
  //Using currentUser from context hook
  const {currentUser} = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <div className="form-container sign-in-container">
      <Box boxShadow="3">
        <div>
          <div>
            <AccountCircleIcon />
            <div>
              <Typography variant="h4">Sign in</Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="login-email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="login-password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
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
                  size="large"
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link variant="body2" component={Link1}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default withRouter(Login)
