import React, { useState, useEffect } from "react";
import { Typography, Checkbox } from "@material-ui/core";
import { useTasks } from "../hooks";
import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";
//Material
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
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

export const Tasks = () => {
  const classes = useStyles();
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject); // gets all the tasks from our useTasks hook in /hooks
  const [checked, setChecked] = useState([0]);

  const handleToggle = value => () => {
    // const currentIndex = checked.indexOf(value)
  };

  let projectName = "";
  // console.log(`selected project - ${selectedProject}`);

  if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
    // console.log(projects);
    // console.log(selectedProject);
    projectName = getTitle(projects, selectedProject).name;
    // console.log("projectName 1: ", projectName);
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    // console.log("projectName 2: ", projectName);
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
            <Checkbox edge="start" checked disableRipple />
          </ListItemIcon>
          <ListItemText primary={task.task} />
        </ListItem>
      ))}
      <AddTask />
    </List>
  );
};
