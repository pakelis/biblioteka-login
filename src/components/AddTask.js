import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { firebase } from "../firebase";
import { useSelectedProjectValue } from "../context";
import { Typography, TextField, Button } from "@material-ui/core";
import { classes } from "istanbul-lib-coverage";

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
    <div>
      {showAddTaskMain && (
        <div onClick={() => setShowMain(!showMain)}>
          <Typography> + Add Task</Typography>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div>
          {showQuickAddTask && (
            <>
              <div>
                <h2>Quick add task</h2>
                <span
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                >
                  X
                </span>
              </div>
            </>
          )}
          <p>Project overlay here</p>
          <p>Task Date here</p>
          <TextField value={task} onChange={e => setTask(e.target.value)} />
          <Button onClick={() => addTask()}>Add Task</Button>
          {!showQuickAddTask && (
            <span
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
            >
              Cancel
            </span>
          )}
          <span onClick={() => setShowProjectOverlay(!showProjectOverlay)}>
            <FaRegListAlt />
          </span>
          <span onClick={() => setShowTaskDate(!showTaskDate)}>
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};
