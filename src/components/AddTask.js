import React, { useState } from "react";
import moment from "moment";
import { firebase } from "../firebase";
import { useSelectedProjectValue } from "../context";
import { Typography, TextField, Button, IconButton } from "@material-ui/core";
import { useUserValue } from "../Auth";
//Material
import { makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Box } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { ProjectOverlay } from "./ProjectOverlay";
import { TaskDate } from "./TaskDate";
import { TaskPriority } from "./TaskPriority";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";

//TODO make textfield outline focused color different, more like lightAccent

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: "25px",
    marginRight: "25px",
    marginTop: "25px"
  },
  quickAddTask: {
    paddingBottom: theme.spacing(2),
    textAlign: "center"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.lightShade.main,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 4),
    width: "27%",
    minWidth: "250px"
  },
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
  setShowQuickAddTask,
  showText = true,
  showModal = false
}) => {
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState(0);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const [openModal, setOpenModal] = useState(showModal);

  const { currentUser } = useUserValue();
  const userId = firebase.auth().currentUser.uid;
  const { selectedProject } = useSelectedProjectValue();

  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleModalClose = () => {
    setShowMain(false);
    setShowProjectOverlay(false);
    setShowQuickAddTask(false);
  };

  // console.log(`Selected Project - ${selectedProject}`);

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
          userId: userId,
          priority: priority
        })
        .then(() => {
          setTask("");
          setProject("");
          setShowMain("");
          setPriority(0);
          setShowProjectOverlay(false);
        })
    );
  };

  return (
    <Box style={{ marginTop: "15px" }}>
      {showAddTaskMain && (
        <Box onClick={() => setShowMain(!showMain)}>
          {showText && (
            <Typography className={classes.addTask}>
              <AddIcon className={classes.addIcon} /> Add Task
            </Typography>
          )}
        </Box>
      )}
      {showMain && (
        <div className={classes.root}>
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
              <Typography
                variant="body1"
                onClick={() => setShowPriority(!showPriority)}
              >
                <IconButton onClick={handleClick}>
                  <FlagOutlinedIcon color="action" />
                </IconButton>
              </Typography>
            </div>
          </div>
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
            anchorEl={anchorEl}
          />
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
            anchorEl={anchorEl}
          />
          <TaskPriority
            setPriority={setPriority}
            showPriority={showPriority}
            setShowPriority={setShowPriority}
            anchorEl={anchorEl}
            priority={priority}
          />
        </div>
      )}
      {showQuickAddTask && showModal && (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={openModal}>
              <div className={classes.paper}>
                <Typography className={classes.quickAddTask} variant="h6">
                  Quick add task
                </Typography>
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
                  autoFocus
                  value={task}
                  onChange={e => setTask(e.target.value)}
                />
                <div className={classes.addTaskContainer}>
                  <Button
                    className={classes.addTaskButton}
                    onClick={() => {
                      showQuickAddTask
                        ? addTask() && setShowQuickAddTask(false)
                        : addTask();
                    }}
                  >
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
                      <IconButton onClick={handleClick}>
                        <FlagOutlinedIcon color="action" />
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
            </Fade>
          </Modal>
        </div>
      )}
    </Box>
  );
};
