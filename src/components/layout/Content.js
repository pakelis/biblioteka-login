import React from 'react'
import app from '../../firebase'
import {Header} from './Header'
import ClassNames from 'classnames'
//Material
import {makeStyles} from '@material-ui/core/styles'
import {Menu} from './Menu'
import MenuIcon from '@material-ui/icons/Menu'
import {
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
} from '@material-ui/core'
import {NavItems} from './NavItems'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.lightShade.main,
    },
  },
  // The main flex container for the app's layout. Its min-height
  // is set to `100vh` so it always fill the height of the screen.
  root: {
    display: 'flex',
    minHeight: '100vh',
    zIndex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: theme.palette.lightShade.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuName: {
    flexGrow: 1, //take up all the space
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbarActions: {
    marginLeft: 'auto',
  },
  drawerPaper: {
    paddingTop: 64, // equal to AppBar height
    width: '80%',
  },
  appContent: theme.mixins.gutters({
    flex: '1 1 100%',
    maxWidth: '100%',
    paddingTop: 80, // equal to AppBar height + 16px
    margin: '0 auto',
    // Set the max content width for each breakpoint
    // Content will be centered in the space to the right/left of drawer
    [theme.breakpoints.up('lg')]: {
      maxWidth: theme.breakpoints.values.lg,
    },
  }),
}))

const Content = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
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
            Namai
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
      <Drawer variant="permanent" className={classes.drawerPaper}>
        <NavItems />
      </Drawer>
    </div>
  )
}

export default Content
