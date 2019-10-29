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

function OverlaySignUp() {
  // const classes = useStyles()

  return (
    <div className="overlay-panel overlay-left">
      <div>
        <Typography variant="h4">Sveiki sugryžę!</Typography>
        <Typography variant="span">
          Įveskite savo asmeninius duomenis ir pradėkite naudotis mūsų
          aplikaciją.
        </Typography>
        <Button>Prisiregistruoti</Button>
      </div>
    </div>
  )
}

export default OverlaySignUp
