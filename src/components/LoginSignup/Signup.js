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

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.lightShade.main,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '50px',
  },
  paperContent: {
    padding: '20px',
  },
  mainText: {
    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    color: theme.palette.primary.main,
    fontSize: '8em',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    color: theme.palette.darkShade.main,
  },
}))

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

  const classes = useStyles()

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Box boxShadow="3">
        <div className={classes.paper}>
          <AccountCircleIcon className={classes.avatar} />
          <div className={classes.paperContent}>
            <Typography variant="h4" className={classes.mainText}>
              Sign up
            </Typography>
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
                      <FaceIcon className={classes.icon} />
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
                      <EmailIcon className={classes.icon} />
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
                      <LockIcon className={classes.icon} />
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
                      <LockIcon className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                size="large"
              >
                Sign up
              </Button>
            </form>
          </div>
        </div>
      </Box>
    </Container>
  )
}

export default withRouter(SignUp)
