import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { firebase } from "../firebase";
import { classes } from "istanbul-lib-coverage";
//Material
import { makeStyles, Box } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { typography, display } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  deleteIcon: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    color: theme.palette.grey.main,
    "&:hover": {
      color: theme.palette.primary.main
    }
  },
  popover: {},
  typography: {
    padding: theme.spacing(2)
  },
  buttonParent: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  deleteButton: {
    "&:hover": { color: theme.palette.danger.main }
  }
}));

export const IndividualProject = ({ project }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const handleClick = event => {
    // setting anchor element position for popover to pop
    setAnchorEl(event.currentTarget);
  };

  const deleteProject = docId => {
    firebase
      .firestore()
      .collection("projects")
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]); // we spread all the projects, so it triggers our setProjects , that refreshes everytime there change in projects
        setSelectedProject("INBOX");
      });
  };

  return (
    <>
      <Typography style={{ flexGrow: 1 }}>{project.name}</Typography>
      <Typography onClick={() => setShowConfirm(!showConfirm)}>
        <DeleteIcon
          fontSize="default"
          color="primary"
          className={classes.deleteIcon}
          onClick={handleClick}
        />
        {showConfirm && (
          <Popover
            open={showConfirm}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            className={classes.popover}
          >
            <Typography className={classes.typography}>
              Are you sure you want to delete this record?
            </Typography>
            <div className={classes.buttonParent}>
              <Button
                type="button"
                onClick={() => deleteProject(project.docId)}
                className={classes.deleteButton}
              >
                Delete
              </Button>
              <Button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className={classes.cancelButton}
              >
                Cancel
              </Button>
            </div>
          </Popover>
        )}
      </Typography>
    </>
  );
  //2:11
};
