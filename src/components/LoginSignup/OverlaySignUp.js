import React from 'react'

//Material
import {
  Button,
  makeStyles,
  Typography,
  Container,
  CssBaseline,
  Box,
  Sizing,
} from '@material-ui/core'
import {isAbsolute} from 'path'
import {classes} from 'istanbul-lib-coverage'

const useStyles = makeStyles(theme => ({
  overlayPanelLeft: {
    backgroundColor: theme.palette.darkAccent.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0px 40px',
    textAlign: 'center',
    height: '100%',
    color: '#FFF',
    fontSize: '18px',
  },
  button: {
    // color: '#fff',
    // borderColor: '#fff !important',
  },
  typography: {
    padding: '20px 0',
  },
}))

function OverlaySignUp() {
  const classes = useStyles()

  return (
    <Container className={classes.overlayPanelLeft} maxWidth="sm">
      <CssBaseline />
      <Typography variant="h3">Sveiki!</Typography>
      <Typography className={classes.typography} variant="paragraph">
        Įveskite savo asmeninius duomenis ir pradėkite naudotis mūsų aplikaciją.
      </Typography>
      <Button
        size="large"
        variant="outlined"
        color="inherit"
        className={classes.button}
      >
        Registracija
      </Button>
    </Container>
  )
}

export default OverlaySignUp
