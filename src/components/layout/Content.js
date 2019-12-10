import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase";
import { Header } from "./Header";
import ClassNames from "classnames";
import { sizing } from "@material-ui/system";
import { Switch, BrowserRouter, Route } from "react-router-dom";
//Material
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import {
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Container
} from "@material-ui/core";
import { NavItems } from "./NavItems";
import { Home } from "../Home";
//hooks
import { useWindowDimensions } from "../../hooks";
import { Records } from "../Records";
import { Tasks } from "../Tasks";
import { AddProject } from "../AddProject";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.lightShade.main
    }
  },
  // The main flex container for the app's layout. Its min-height
  // is set to `100vh` so it always fill the height of the screen.
  root: {
    display: "flex",
    minHeight: "100vh",
    zIndex: 1,
    position: "relative",
    overflow: "hidden",
    backgroundColor: theme.palette.lightShade.main
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  menuName: {
    flexGrow: 1 //take up all the space
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbarActions: {
    marginLeft: "auto"
  },
  appContent: theme.mixins.gutters({
    flex: "1 1 100%",
    maxWidth: "60%",
    paddingTop: 80, // equal to AppBar height + 16px
    margin: "0 auto",
    alignItems: "center",
    marginLeft: "270px",
    // Set the max content width for each breakpoint
    // Content will be centered in the space to the right/left of drawer
    [theme.breakpoints.up("sm")]: {
      maxWidth: theme.breakpoints.values.sm
    }
  })
}));

const Content = props => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const { width, height } = useWindowDimensions();

  const handleDrawer = () => {
    setOpen(!open);
  };

  //if screen get to certain width it closes and vice versa
  useEffect(() => {
    width < 860 && open && setOpen(false);
    width > 860 && !open && setOpen(true);
  }, [width]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.menuName}>
            Namai
          </Typography>
          <Button
            onClick={() => firebase.auth().signOut()}
            //button has onClick handler that will sign us out using firebase API
            color="inherit"
            className={classes.logout}
          >
            Atsijungti
          </Button>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Drawer variant="persistent" anchor="left" open={open}>
          <NavItems />
          <AddProject />
        </Drawer>
        <main className={classes.appContent}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/records" component={Records} />
            <Route path="/tasks" component={Tasks} />
          </Switch>
          <Tasks />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default Content;
