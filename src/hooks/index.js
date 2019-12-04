import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import "@firebase/firestore";
import moment from "moment";
import { collatedTasksExist } from "../helpers";

function getWindowsDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimension, setWindowDimension] = useState(
    getWindowsDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimension(getWindowsDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // removing event listener when components unmounts
  }, []); // on every update

  return windowDimension;
}

export const useTasks = selectedRecord => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "abc001"); //Go get our tasks where userId is this

    unsubscribe = //this one means give me the tasks for selected project, it can be 1 or TODAY or INBOX etc....
      selectedRecord && !collatedTasksExist(selectedRecord)
        ? (unsubscribe = unsubscribe.where("recordId", "==", selectedRecord))
        : selectedRecord === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : selectedRecord === "INBOX" || selectedRecord === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe; //47:56 timestamp of video.....

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data()
      }));

      setTasks(
        selectedRecord === "NEXT_7"
          ? newTasks.filter(
              task =>
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                task.archived !== true
            )
          : newTasks.filter(task => task.archived !== true)
      );

      setArchivedTasks(newTasks.filter(task => task.archived !== false));
    });

    return () => unsubscribe(); // clean up function ? when unmounts?
  }, [selectedRecord]); //run this once (empty array) , run when selectedRecord is changed

  return { tasks, archivedTasks };
};

// const selectedRecord = 1
// const { tasks, archivedTasks } = useTasks(selectedRecord)
// this is how useTasks hook gonna work ^ (we get all the tasks that got recordId 1 etc.)

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("records")
      .where("userId", "==", "abc001")
      .orderBy("recordId")
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
