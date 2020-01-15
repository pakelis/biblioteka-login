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
    width: "80%"
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
  },
  bubble: {
    color: "red",
    height: "15px",
    width: "15px",
    borderRadius: "50%"
  },
  bubbleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export const AddProject = ({ shouldShow = false }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");
  const [color, setColor] = useState(null);

  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();
  const { currentUser } = useUserValue();
  const userId = firebase.auth().currentUser.uid;

  const handleClick = event => {
    // setting anchor element position for popover to pop
    setAnchorEl(event.currentTarget);
    setShow(!show);
  };

  const selectedColor = color => {
    setColor(color);
  };

  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection("projects")
        .add({
          projectId,
          name: projectName,
          userId: userId,
          color: color
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
          <div className={classes.bubbleContainer}>
            {color != null ? (
              <div
                className={classes.bubble}
                style={{ backgroundColor: color }}
              />
            ) : null}
            <TextField
              className={classes.textField}
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              type="text"
              placeholder="Name your project"
            />
          </div>
          <div className={classes.buttonParent}>
            <Button
              onClick={() => addProject()}
              className={classes.buttonSuccess}
            >
              Add Project
            </Button>
            <Button onClick={() => setShow(false)}>Cancel</Button>
          </div>
          <AddProjectColorGrid selectedColor={selectedColor} />
        </Popover>
      )}
    </div>
  );
};
