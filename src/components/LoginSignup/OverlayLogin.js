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
  '@global': {
    boxSizing: 'border-box',
  },
  overlayPanelLeft: {
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0px 40px',
    textAlign: 'center',
    height: '100%',
  },
  div: {
    marginTop: theme.spacing(8),
  },
}))

function OverlayLogin() {
  const classes = useStyles()

  return (
    <div className={classes.div}>
      <Container className={classes.overlayPanelLeft} maxWidth="sm">
        <CssBaseline />
        <Typography variant="h4">Sveiki sugryžę!</Typography>
        <Typography variant="span">
          Jei norite palaikyti ryšį su mumis, prisijunkite ir pateikite savo
          asmeninę informaciją
        </Typography>
        <Button>Prisijungti</Button>
      </Container>
    </div>
  )
}

export default OverlayLogin
