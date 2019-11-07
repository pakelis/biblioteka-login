import React from 'react'
import app from '../../firebase'
import {Header} from './Header'
//Material
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.lightShade.main,
    },
  },
}))

const Content = () => {
  const classes = useStyles()

  return (
    <div>
      <Header />
      <h1>Home</h1>
    </div>
  )
}

export default Content
