import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import "@firebase/firestore";
import moment from "moment";
import { collatedTasksExist } from "../helpers";
import { useUserValue } from "../Auth";

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

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);

    // if (currentUser != null) {
    const userId = firebase.auth().currentUser.uid;

    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", userId); //Go get our tasks where userId is this

    unsubscribe = //this one means give me the tasks for selected project, it can be 1 or TODAY or INBOX etc....
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : selectedProject === "INBOX" || selectedProject === 0 //Goes to inbox when you don't select date!
        ? (unsubscribe = unsubscribe) // ? (unsubscribe = unsubscribe.where("date", "==", "")) , we changed that in inbox there all tasks, not only where there's no date
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data()
      }));

      setTasks(
        selectedProject === "NEXT_7"
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
    // }
  }, [selectedProject]); //run this once (empty array) , run when selectedProject is changed

  return { tasks, archivedTasks };
};

// const selectedProject = 1
// const { tasks, archivedTasks } = useTasks(selectedProject)
// this is how useTasks hook gonna work ^ (we get all the tasks that got projectId 1 etc.)

//currentUser doesn't get any value because hooks is not wrapped with the context provider
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);

    if (currentUser != null) {
      const userId = firebase.auth().currentUser.uid;
      firebase
        .firestore()
        .collection("projects")
        .where("userId", "==", userId)
        .orderBy("projectId")
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
    }
  }, [projects, currentUser]);

  return { projects, setProjects };
};
