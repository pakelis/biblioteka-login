import React from 'react'
import app from '../../firebase'
//Material
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuName: {
    flexGrow: 1, //take up all the space
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    zIndex: theme.zIndex.drawer + 1,
  },
}))

export const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.menuName}>
          <Hidden xsDown>Namai</Hidden>
        </Typography>
        <Button
          onClick={() => app.auth().signOut()}
          //button has onClick handler that will sign us out using firebase API
          color="inherit"
          className={classes.logout}
        >
          Atsijungti
        </Button>
      </Toolbar>
    </AppBar>
  )
}
