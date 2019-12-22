import React, { useState, useEffect } from "react";
import { Typography, Checkbox } from "@material-ui/core";
import { useTasks } from "../hooks";
import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import { CheckBox } from "./CheckBox";
import { firebase } from "../firebase";
import { useUserValue } from "../Auth";
import Moment from "moment";
//Material
import SortByAlphaOutlinedIcon from "@material-ui/icons/SortByAlphaOutlined";
import UpdateIcon from "@material-ui/icons/Update";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { AddTask } from "./AddTask";

const useStyles = makeStyles(theme => ({
  root: {
    width: "95%",
    maxWidth: 720
  },
  title: {
    padding: "15px"
  },
  tasksHeader: {
    display: "flex",
    alignItems: "center"
  }
}));

//timestamp 1:12

//Timestamp 3:45

export const Tasks = () => {
  const classes = useStyles();
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject); // gets all the tasks from our useTasks hook in /hooks
  const [sortedTasks, setSortedTasks] = useState([]);

  // console.log(`selectedProject - ${selectedProject}`);
  // console.log(`tasks - ${tasks}`);

  const sortByAlpha = tasks => {
    let sorted = tasks.sort((a, b) => a.task.localeCompare(b.task));
    setSortedTasks(sorted);
    tasks = sortedTasks;
  };

  const sortByDate = tasks => {
    let sorted = tasks.sort((a, b) => a.date - b.date);
    setSortedTasks(sorted);
    tasks = sortedTasks;
    console.log(sorted);
  };

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
      <div className={classes.tasksHeader}>
        <Typography variant="h4" className={classes.title}>
          {projectName}
        </Typography>
        <div style={{ marginLeft: "auto" }}>
          <IconButton onClick={() => sortByAlpha(tasks)}>
            <SortByAlphaOutlinedIcon />
          </IconButton>
          <IconButton onClick={() => sortByDate(tasks)}>
            <UpdateIcon />
          </IconButton>
        </div>
      </div>
      {tasks.map(task => (
        <div key={task.id}>
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
          <Divider />
        </div>
      ))}
      <AddTask />
    </List>
  );
};
