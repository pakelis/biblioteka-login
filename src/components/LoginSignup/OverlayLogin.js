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
    color: '#fff',
    fontSize: '18px',
  },
  button: {},
  typography: {
    padding: '20px 0',
  },
}))

export const OverlayLogin = ({toggleClick}) => {
  const classes = useStyles()

  return (
    <Container className={classes.overlayPanelLeft} maxWidth="sm">
      <CssBaseline />
      <Typography variant="h4">Sveiki sugryžę!</Typography>
      <Typography className={classes.typography} variant="span">
        Jei norite palaikyti ryšį su mumis, prisijunkite ir pateikite savo
        asmeninę informaciją
      </Typography>
      <Button
        onClick={toggleClick}
        color="inherit"
        variant="outlined"
        size="large"
        className={classes.button}
      >
        Prisijungti
      </Button>
    </Container>
  )
}

export default OverlayLogin
