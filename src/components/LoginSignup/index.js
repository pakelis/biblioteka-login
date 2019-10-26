import React from 'react'
import Login from './Login'
import Signup from './Signup'

//Material
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
import OverlayLogin from './OverlayLogin'

export default function LoginSignup() {
  return (
    <Container>
      {/* <Login /> */}
      {/* <Signup /> */}
      <OverlayLogin />
    </Container>
  )
}
