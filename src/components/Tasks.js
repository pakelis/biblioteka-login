import React, { useState, useEffect, useRef } from "react";
import { Typography, Checkbox } from "@material-ui/core";
import { useTasks } from "../hooks";
import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import { firebase } from "../firebase";
import { TaskPriority } from "./TaskPriority";
import {
  YellowCheckbox,
  GreyCheckbox,
  RedCheckbox,
  GreenCheckbox
} from "./CheckboxStyles";
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
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";

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
  const [hovered, setHovered] = useState({}); // we make empty hovered object, and we insert index property into object, to know which item is hovered
  const [hoveredCheckbox, setHoveredCheckbox] = useState({});
  //For priority overlay
  const [showPriority, setShowPriority] = useState(false);
  const [priority, setPriority] = useState(0);
  const [anchorEl, setAnchorEl] = useState();

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
  const sortByPriority = tasks => {
    if (sortOrder === true) {
      let sorted = tasks.sort((a, b) => a.priority - b.priority);
      setSortedTasks(sorted);
      setSortOrder(!sortOrder);
      tasks = sortedTasks;
    } else if (sortOrder === false) {
      let sorted = tasks.sort((a, b) => b.priority - a.priority);
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

  const handleMouseEnter = index => {
    setHovered(prevState => {
      return { ...prevState, [index]: true };
    });
  };

  const handleMouseLeave = index => {
    setHovered(prevState => {
      return { ...prevState, [index]: false };
    });
  };

  const handleCheckboxEnter = index => {
    setHoveredCheckbox(prevState => {
      return { ...prevState, [index]: true };
    });
  };

  const handleCheckboxLeave = index => {
    setHoveredCheckbox(prevState => {
      return { ...prevState, [index]: false };
    });
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
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
          <Tooltip title="Sort by priority">
            <IconButton onClick={() => sortByPriority(tasks)}>
              <EmojiFlagsIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {tasks.map((task, i) => (
        <div
          key={task.id}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={() => handleMouseLeave(i)}
        >
          <ListItem key={task.id} dense button>
            <ListItemIcon>
              {/* we check what priority we have so we can render different checkboxes */}
              {task.priority === 0 ? (
                <GreyCheckbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  checked={hoveredCheckbox[i] ? true : false} // we check if checkbox is hovered we make it checked so we get checkedIcon
                  color="primary"
                  edge="start"
                  disableRipple
                  onClick={() => archiveTask(task.id)}
                  onMouseEnter={() => handleCheckboxEnter(i)} // we check if element is hovered
                  onMouseLeave={() => handleCheckboxLeave(i)}
                />
              ) : task.priority === 1 ? (
                <GreenCheckbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  checked={hoveredCheckbox[i] ? true : false}
                  color="primary"
                  edge="start"
                  disableRipple
                  onClick={() => archiveTask(task.id)}
                  onMouseEnter={() => handleCheckboxEnter(i)}
                  onMouseLeave={() => handleCheckboxLeave(i)}
                />
              ) : task.priority === 2 ? (
                <YellowCheckbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  checked={hoveredCheckbox[i] ? true : false}
                  color="primary"
                  edge="start"
                  disableRipple
                  onClick={() => archiveTask(task.id)}
                  onMouseEnter={() => handleCheckboxEnter(i)}
                  onMouseLeave={() => handleCheckboxLeave(i)}
                />
              ) : task.priority === 3 ? (
                <RedCheckbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  checked={hoveredCheckbox[i] ? true : false}
                  color="primary"
                  edge="start"
                  disableRipple
                  onClick={() => archiveTask(task.id)}
                  onMouseEnter={() => handleCheckboxEnter(i)}
                  onMouseLeave={() => handleCheckboxLeave(i)}
                />
              ) : (
                <Checkbox onClick={() => archiveTask(task.id)} />
              )}
            </ListItemIcon>
            <ListItemText primary={task.task} />
            {hovered[i] && (
              <div>
                <Typography onClick={() => setShowPriority(!priority)}>
                  <FlagOutlinedIcon color="action" onClick={handleClick} />
                </Typography>
                <TaskPriority
                  setPriority={setPriority}
                  showPriority={showPriority}
                  setShowPriority={setShowPriority}
                  anchorEl={anchorEl}
                  priority={priority}
                />
              </div>
            )}
          </ListItem>
          <Divider />
        </div>
      ))}
      <AddTask />
    </List>
  );
};
