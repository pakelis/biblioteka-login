import React, { useState, useEffect, useRef } from "react";
import { Typography, Checkbox } from "@material-ui/core";
import { useTasks } from "../hooks";
import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import { firebase } from "../firebase";
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
import Tooltip from "@material-ui/core/Tooltip";

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
  },
  bubble: {
    height: "15px",
    width: "15px",
    borderRadius: "50%"
  },
  typoContainer: {
    display: "flex",
    alignItems: "center"
  }
}));

export const Tasks = () => {
  const classes = useStyles();
  const { selectedProject, selectedProjectColor } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject); // gets all the tasks from our useTasks hook in /hooks
  const [sortedTasks, setSortedTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState(true);
  const itemsRef = useRef([]);
  const [hovered, setHovered] = useState([]);
  // you can access the elements with itemsRef.current[n]

  const sortByAlpha = tasks => {
    if (sortOrder === true) {
      let sorted = tasks.sort((a, b) => a.task.localeCompare(b.task));
      setSortedTasks(sorted);
      setSortOrder(!sortOrder);
      tasks = sortedTasks;
    } else if (sortOrder === false) {
      let sorted = tasks.sort((a, b) => b.task.localeCompare(a.task));
      setSortedTasks(sorted);
      setSortOrder(!sortOrder);
      tasks = sortedTasks;
    }
  };

  const sortByDate = tasks => {
    if (sortOrder === true) {
      let sorted = tasks.sort((a, b) => a.date.localeCompare(b.date));
      setSortedTasks(sorted);
      setSortOrder(!sortOrder);
      tasks = sortedTasks;
    } else if (sortOrder === false) {
      let sorted = tasks.sort((a, b) => b.date.localeCompare(a.date));
      setSortedTasks(sorted);
      setSortOrder(!sortOrder);
      tasks = sortedTasks;
    }
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
  let projectColor = selectedProjectColor;

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

    //making ref array for each div we render?? what next?
    itemsRef.current = itemsRef.current.slice(0, tasks.length);
  }, [tasks]);

  return (
    <List className={classes.root}>
      <div className={classes.tasksHeader}>
        <Typography variant="h4" className={classes.title}>
          {collatedTasksExist(selectedProject) ? ( // if project doesn't exist in collatedTasks, we add color bubble near projectName
            projectName
          ) : (
            <div className={classes.typoContainer}>
              <div
                className={classes.bubble}
                style={{ backgroundColor: projectColor }}
              />
              <div style={{ marginLeft: "15px" }}>{projectName}</div>
            </div>
          )}
        </Typography>
        <div style={{ marginLeft: "auto" }}>
          <Tooltip title="Sort by name">
            <IconButton onClick={() => sortByAlpha(tasks)}>
              <SortByAlphaOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sort by date">
            <IconButton onClick={() => sortByDate(tasks)}>
              <UpdateIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {tasks.map((task, i) => (
        <div key={task.id} ref={el => (itemsRef.current[i] = el)}>
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
