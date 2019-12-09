import React, { useState } from "react";
import { firebase } from "../firebase";
import { generatePushId } from "../helpers";
import { useProjectsValue } from "../context";
//Material
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import { Typography, Button, Box, TextField } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles(theme => ({
  addProject: {
    display: "flex",
    margin: "auto",
    color: theme.palette.primary.main,
    backgroundColor: "#fff"
  },
  icon: {
    marginRight: "10px"
  }
}));

export const AddProject = ({ shouldShow = false }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");

  const projectId = generatePushId();
  const { setProjects } = useProjectsValue();

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
          userId: "abc001"
        })
        .then(() => {
          setProjects([]);
          setProjectName("");
          setShow(false);
        });
  };

  return (
    <div>
      <Button fullWidth className={classes.addProject} onClick={handleClick}>
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
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            type="text"
            placeholder="Name your project"
          />
          <Button onClick={() => addProject()}>Add Project</Button>
          <Button onClick={() => setShow(false)}>Cancel</Button>
        </Popover>
      )}
    </div>
    //timestamp 2.44
  );
};
