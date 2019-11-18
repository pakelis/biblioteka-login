import React, { useState, useEffect } from "react";
import { Typography, Checkbox } from "@material-ui/core";
import { useTasks } from "../../hooks";
//Material
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

const useStyles = makeStyles(theme => ({
  root: {
    wdith: "100%",
    maxWidth: 360
  }
}));

export const Tasks = () => {
  //timestamp 1:12
  const { tasks } = useTasks("1");
  const classes = useStyles();

  console.log(tasks);

  return (
    <div>
      <Typography variant="h3">Tasks</Typography>
      <ul className="tasks__list">
        {tasks.map(task => (
          <li key={`${tasks.id}`}>
            <Checkbox id={task.id}>
              <span>{task.task}</span>
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
};
