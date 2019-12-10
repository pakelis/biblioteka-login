import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { firebase } from "../firebase";
import { useSelectedProjectValue } from "../context";
import { Typography, TextField, Button } from "@material-ui/core";
//Material
import { makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Box } from "@material-ui/core";
import { fontWeight } from "@material-ui/system";

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
  addTaskButton: {
    color: theme.palette.success.main
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

  const { selectedProject } = useSelectedProjectValue();

  const classes = useStyles();

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
          <Typography paragraph={true}>Project overlay here</Typography>
          <Typography paragraph={true}>Task Date here</Typography>
          <TextField
            className={classes.textField}
            variant="outlined"
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <Button
            className={classes.addTaskButton}
            variant="contained"
            onClick={() => addTask()}
          >
            Add Task
          </Button>
          {!showQuickAddTask && (
            <Typography
              variant="body1"
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
            >
              Cancel
            </Typography>
          )}
          <Typography
            variant="body1"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
          >
            <FaRegListAlt />
          </Typography>
          <Typography
            variant="body1"
            onClick={() => setShowTaskDate(!showTaskDate)}
          >
            <FaRegCalendarAlt />
          </Typography>
        </div>
      )}
    </Box>
  );
};
