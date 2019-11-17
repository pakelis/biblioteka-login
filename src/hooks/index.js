import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import moment from "moment";

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

const collatedTasksExist = () => {};

export const useTasks = selectedRecord => {
  const [tasks, setTasks] = useState([]);

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
  }, []); //run this once (empty array)
};
