import React, { useState } from "react";
import moment from "moment";
import { firebase } from "../firebase";
import { useSelectedProjectValue } from "../context";
import { Typography, TextField, Button, IconButton } from "@material-ui/core";
//Material
import { makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Box } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { ProjectOverlay } from "./ProjectOverlay";
import { TaskDate } from "./TaskDate";

//TODO make textfield outline focused color different, more like lightAccent

const useStyles = makeStyles(theme => ({
  root: {},
  textField: {
    width: "100%"
  },
  addIcon: {
    marginRight: "5px"
  },
  addTask: {
    color: theme.palette.darkGrey.main,
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.lightAccent.main,
      cursor: "pointer"
    }
  },
  addTaskContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "10px"
  },
  iconsContainer: {
    marginLeft: "auto",
    display: "flex"
  },
  cancel: {
    marginLeft: "15px",
    fontWeight: "500",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer"
    }
  },
  addTaskButton: {
    color: "white",
    backgroundColor: theme.palette.lightAccent.main,
    "&:hover": {
      backgroundColor: theme.palette.darkAccent.main
    }
  }
}));

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask
}) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const [anchorEl, setAnchorEl] = useState();

  const { selectedProject } = useSelectedProjectValue();

  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  console.log(`Selected Project - ${selectedProject}`);

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (projectId === "NEXT_7") {
      collatedDate = moment()
        .add(7, "days")
        .format("DD/MM/YYYY");
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection("tasks")
        .add({
          archived: "false",
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: "abc001"
        })
        .then(() => {
          setTask("");
          setProject("");
          setShowMain("");
          setShowProjectOverlay(false);
        })
    );
  };

  return (
    <Box style={{ marginTop: "15px" }}>
      {showAddTaskMain && (
        <Box onClick={() => setShowMain(!showMain)}>
          <Typography className={classes.addTask}>
            <AddIcon className={classes.addIcon} /> Add Task
          </Typography>
        </Box>
      )}
      {/* Timestamp 3.35, can't understand why this opens AddTask component, need to make modal */}
      {(showMain || showQuickAddTask) && (
        <div style={{ marginTop: "15px" }}>
          {showQuickAddTask && (
            <>
              <div>
                <Typography variant="h2">Quick add task</Typography>
                <Typography
                  variant="body1"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                >
                  X
                </Typography>
              </div>
            </>
          )}
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
            anchorEl={anchorEl}
          />
          <TextField
            placeholder="Enter task name"
            className={classes.textField}
            variant="outlined"
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <div className={classes.addTaskContainer}>
            <Button className={classes.addTaskButton} onClick={() => addTask()}>
              Add Task
            </Button>
            {!showQuickAddTask && (
              <Typography
                className={classes.cancel}
                variant="body1"
                onClick={() => {
                  setShowMain(false);
                  setShowProjectOverlay(false);
                }}
              >
                Cancel
              </Typography>
            )}
            <div className={classes.iconsContainer}>
              <Typography
                variant="body1"
                onClick={() => setShowProjectOverlay(!showProjectOverlay)}
              >
                <IconButton onClick={handleClick}>
                  <EventNoteIcon color="action" />
                </IconButton>
              </Typography>
              <Typography
                variant="body1"
                onClick={() => setShowTaskDate(!showTaskDate)}
              >
                <IconButton onClick={handleClick}>
                  <DateRangeIcon color="action" />
                </IconButton>
              </Typography>
            </div>
          </div>
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
            anchorEl={anchorEl}
          />
        </div>
      )}
    </Box>
  );
};
