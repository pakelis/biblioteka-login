import React, {useCallback, useContext, useState} from 'react'
import {withRouter, Redirect} from 'react-router'
import {firebase} from '../../../firebase'

//MATERIAL
import InputAdornment from '@material-ui/core/InputAdornment'
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
  Paper,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  '@global': {
    boxSizing: 'border-box',
    padding: '0',
    margin: '0',
    body: {
      backgroundColor: theme.palette.lightShade.main,
    },
  },
  mainContainer: {
    margin: '2rem auto',
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paperContent: {
    padding: '20px',
  },
  mainText: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  avatar: {
    color: theme.palette.primary.main,
    fontSize: '8em',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
  icon: {
    color: theme.palette.darkShade.main,
  },
  smallText: {
    color: theme.palette.darkShade.main,
  },
}))

const ForgotPassword = ({history}) => {
  //Using styles hook from material
  const classes = useStyles()

  const handleRecovery = useCallback(
    async event => {
      event.preventDefault()
      const {email} = event.target.elements
      try {
        await firebase.auth().sendPasswordResetEmail(email.value)

        history.push('/login')
      } catch (err) {
        alert(err)
      }
    },
    [history],
  )

  return (
    <Paper className={classes.mainContainer}>
      <Container component="div" maxWidth="sm" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <AccountCircleIcon className={classes.avatar} />
          <div className={classes.paperContent}>
            <Typography variant="h4" className={classes.mainText}>
              Please enter your password
            </Typography>
            <form onSubmit={handleRecovery} className={classes.form}>
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
                      <EmailIcon className={classes.icon} />
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
                Reset Password
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </Paper>
  )
}

export default withRouter(ForgotPassword)
