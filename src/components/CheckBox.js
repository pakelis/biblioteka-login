import React from "react";
import { firebase } from "../firebase";
import { Checkbox } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export const CheckBox = ({ id, taskDescription }) => {
  const archiveTask = () => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(id)
      .update({
        archived: true
      });
  };

  return (
    <ListItemIcon onClick={archiveTask()}>
      <Checkbox edge="start" disableRipple />
    </ListItemIcon>
  );
};
