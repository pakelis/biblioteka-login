import React from 'react'

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
import {isAbsolute} from 'path'
import {classes} from 'istanbul-lib-coverage'

const useStyles = makeStyles(theme => ({
  '@global': {
    boxSizing: 'border-box',
  },
  overlayPanelLeft: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0px 40px',
    textAlign: 'center',
    top: '0px',
    height: '100%',
    width: '50%',
  },
}))

function OverlayLogin() {
  const classes = useStyles()

  return (
    <Container className={classes.overlayPanelLeft}>
      <Typography variant="h4">Sveiki sugryžę!</Typography>
      <Typography variant="span">
        Jei norite palaikyti ryšį su mumis, prisijunkite ir pateikite savo
        asmeninę informaciją
      </Typography>
      <Button>Prisijungti</Button>
    </Container>
  )
}

export default OverlayLogin
