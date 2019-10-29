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

function OverlayLogin() {
  // const classes = useStyles()

  return (
    <div className="overlay-panel overlay-right">
      <div>
        <Typography variant="h4">Sveiki sugryžę!</Typography>
        <Typography variant="span">
          Jei norite palaikyti ryšį su mumis, prisijunkite ir pateikite savo
          asmeninę informaciją
        </Typography>
        <Button>Prisijungti</Button>
      </div>
    </div>
  )
}

export default OverlayLogin
