import React, { useState } from "react";
import { firebase } from "../firebase";
import { generatePushId } from "../helpers";
import { useProjectsValue } from "../context";
import { useUserValue } from "../Auth";
import { AddProjectColorGrid } from "./AddProjectColorGrid";
//Material
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import { Button, TextField } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles(theme => ({
  addProjectButton: {
    display: "flex",
    margin: "auto",
    color: theme.palette.primary.main,
    backgroundColor: "#fff"
  },
  icon: {
    marginRight: "10px"
  },
  textField: {
    padding: "20px",
    width: "100%"
  },
  popover: {
    display: "flex",
    flexWrap: "wrap",
    width: "250px",
    justifyContent: "center"
  },
  buttonParent: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  buttonSuccess: {
    "&:hover": {
      color: "green"
    }
  }
}));

export const AddProject = ({ shouldShow = false }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");

  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();
  const { currentUser } = useUserValue();
  const userId = firebase.auth().currentUser.uid;

  const handleClick = event => {
    // setting anchor element position for popover to pop
    setAnchorEl(event.currentTarget);
    setShow(!show);
  };

  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection("projects")
        .add({
          projectId,
          name: projectName,
          userId: userId
        })
        .then(() => {
          setProjects([...projects]);
          setProjectName("");
          setShow(false);
        });
  };

  return (
    <div>
      <Button
        fullWidth
        className={classes.addProjectButton}
        onClick={handleClick}
      >
        <AddCircleOutlineIcon className={classes.icon} />
        Add Project
      </Button>
      {show && (
        <Popover
          open={show}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          className={classes.popover}
        >
          <TextField
            className={classes.textField}
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            type="text"
            placeholder="Name your project"
          />
          <div className={classes.buttonParent}>
            <Button
              onClick={() => addProject()}
              className={classes.buttonSuccess}
            >
              Add Project
            </Button>
            <Button onClick={() => setShow(false)}>Cancel</Button>
          </div>
          <AddProjectColorGrid />
        </Popover>
      )}
    </div>
    //timestamp 2.44
  );
};
