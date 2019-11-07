import React from 'react'
import app from '../../firebase'
import {Header} from './Header'
//Material
import {makeStyles} from '@material-ui/core/styles'
import {Menu} from './Menu'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.lightShade.main,
    },
  },
  root: {
    display: 'flex',
    minHeight: '100vh',
    zIndex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
}))

const Content = () => {
  const classes = useStyles()

  return (
    <div>
      <Header />
      <Menu />
    </div>
  )
}

export default Content
