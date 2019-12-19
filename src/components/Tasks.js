import React, { useState, useEffect } from "react";
import { Typography, Checkbox } from "@material-ui/core";
import { useTasks } from "../hooks";
import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import { CheckBox } from "./CheckBox";
import { firebase } from "../firebase";
//Material
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { AddTask } from "./AddTask";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 460
  },
  title: {
    padding: "15px"
  }
}));

//timestamp 1:12

//Timestamp 3:45

export const Tasks = () => {
  const classes = useStyles();
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject); // gets all the tasks from our useTasks hook in /hooks

  //TODO whenever component mounts first time inbox content is empty, even though selectedProjects is INBOX ?

  const archiveTask = id => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(id)
      .update({
        archived: true
      });
  };

  let projectName = "";

  if (
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  return (
    <List className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        {projectName}
      </Typography>
      {tasks.map(task => (
        <ListItem key={task.id} dense button>
          <ListItemIcon>
            <Checkbox
              edge="start"
              disableRipple
              onClick={() => archiveTask(task.id)}
            />
          </ListItemIcon>
          <ListItemText primary={task.task} />
        </ListItem>
      ))}
      <AddTask />
    </List>
  );
};
