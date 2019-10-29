import React, {useCallback} from 'react'
import {withRouter} from 'react-router'
import app from '../../firebase'

//Material
import InputAdornment from '@material-ui/core/InputAdornment'
import LockIcon from '@material-ui/icons/Lock'
import EmailIcon from '@material-ui/icons/Email'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import FaceIcon from '@material-ui/icons/Face'
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
  Box,
  Input,
} from '@material-ui/core'

const SignUp = ({history}) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault()
      //we get email and password with e.target.elements
      const {name, email, password, password2} = event.target.elements
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

  // const classes = useStyles()

  return (
    <div className="form-container sign-up-container">
      <Box boxShadow="3">
        <div>
          <CssBaseline />
          <div>
            <AccountCircleIcon />
            <div>
              <Typography variant="h4">Sign up</Typography>
              <form onSubmit={handleSignUp}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FaceIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="signup-email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  type="password"
                  required
                  fullWidth
                  id="signup-password"
                  label="Password"
                  name="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="signup-password2"
                  label="Repeat Password"
                  name="password2"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Sign up
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default withRouter(SignUp)
