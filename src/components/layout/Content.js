import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Backdrop from "@material-ui/core/Backdrop";
import {
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Paper
} from "@material-ui/core";
import { NavItems } from "./NavItems";
import { useWindowDimensions } from "../../hooks";
import { Records } from "../Records";
import { Tasks } from "../Tasks";
import { AddProject } from "../AddProject";
import { useSelectedProjectValue } from "../../context";
import { AddTask } from "../AddTask";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.lightShade.main
    }
  },
  // The main flex container for the app's layout. Its min-height
  // is set to `100vh` so it always fill the height of the screen.
  backdrop: {
    zIndex: 1,
    color: "#fff"
  },
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
    // flexGrow: 1 //take up all the space
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbarActions: {
    marginLeft: "auto"
  },
  appContent: {
    flex: "1 1 100%",
    maxWidth: "720px",
    paddingTop: 80, // equal to AppBar height + 16px
    margin: "0 auto",
    alignItems: "center",
    marginLeft: "auto",
    marginTop: "-22px"
  },
  addIcon: {
    color: "white"
  },
  shiftContentLeft: {
    marginLeft: "0px"
  },
  shiftContentRight: {
    marginLeft: "270px"
  },
  paperContent: {
    height: "100vh",
    display: "flex",
    justifyContent: "center"
  }
}));

const Content = props => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const { width, height } = useWindowDimensions();
  const { selectedProject } = useSelectedProjectValue();
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [mobileSize, setMobileSize] = useState(false);

  //Use backdrop to make grey overlay when drawer opens on mobile !

  const handleDrawer = () => {
    setOpen(!open);
  };

  //if screen get to certain width it closes and vice versa
  useEffect(() => {
    width < 1360 && open && setOpen(false);
    width > 1360 && !open && setOpen(true);
    if (width <= 425 && height <= 835) {
      setMobileSize(true);
    } else {
      setMobileSize(false);
    }
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
            {selectedProject === "TODAY"
              ? "Today"
              : selectedProject === "INBOX"
              ? "Inbox"
              : selectedProject === "NEXT_7"
              ? "Next 7 days"
              : "Records"}
          </Typography>
          <IconButton
            onClick={() => {
              setShowQuickAddTask(true);
              setShouldShowMain(true);
            }}
          >
            <AddOutlinedIcon className={classes.addIcon} />
          </IconButton>
          <Button
            style={{ marginLeft: "auto" }}
            onClick={() => firebase.auth().signOut()}
            //button has onClick handler that will sign us out using firebase API
            color="inherit"
            className={classes.logout}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Drawer variant="persistent" anchor="left" open={open}>
          <NavItems />
          <AddProject />
        </Drawer>
        <main className={classes.appContent}>
          <Paper className={classes.paperContent}>
            {/* <Switch> */}
            {/* <Route path="/home" component={Home} /> */}
            {/* <Route path="/records" component={Records} /> */}
            {/* <Route path="/tasks" component={Tasks} /> */}
            {/* </Switch> */}
            <Tasks />
            <AddTask
              showAddTaskMain={false}
              shouldShowMain={shouldShowMain}
              showQuickAddTask={showQuickAddTask}
              setShowQuickAddTask={setShowQuickAddTask}
              showText={false}
              showModal={true}
            />
          </Paper>
        </main>
        <Backdrop
          className={classes.backdrop}
          open={mobileSize && open}
          onClick={() => setOpen(false)}
        />
      </BrowserRouter>
    </div>
  );
};

export default Content;
