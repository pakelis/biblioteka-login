import React, { useState } from "react";
import { MenuList, Popover, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  priorityContainer: {
    display: "flex"
  },
  priorityFlagCircle: {
    height: "50px",
    width: "38%", //so our flexWrap wraps to another row
    backgroundColor: "#bbb",
    borderRadius: "50%",
    margin: "6px",
    display: "flex",
    justifyContent: "center"
  },
  flag: {
    alignSelf: "center",
    color: "white",
    position: "relative"
  }
}));

export const TaskPriority = ({
  anchorEl,
  setPriority,
  showPriority,
  setShowPriority
}) => {
  const classes = useStyles();
  const numCols = 2;
  const numRows = 2;
  const [flagGrid, setFlagGrid] = useState(() => {
    let indx = 0;
    let rows = [];
    for (let i = 0; i < numRows; i++) {
      //   rows.push(Array.from(Array(numCols), () => 0));
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });
  const colors = ["#f44336", "#d48a1a", "#579a52", "#707070"];
  const priority = [
    "High priority",
    "Medium priority",
    "Low priority",
    "No priority"
  ];
  let priorityIndex = 0;

  return (
    showPriority && (
      <Popover
        style={{ borderRadius: "25%" }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <div className={classes.container}>
          {flagGrid.map((rows, i) =>
            rows.map((cols, k) => {
              return (
                <div className={classes.priorityContainer}>
                  <div
                    className={classes.priorityFlagCircle}
                    style={{ backgroundColor: colors[priorityIndex] }}
                    key={`${i}-${k}`}
                  >
                    <FlagOutlinedIcon className={classes.flag} />
                  </div>
                  <Typography
                    style={{ fontSize: "14px", color: colors[priorityIndex] }}
                  >
                    {priority[priorityIndex++]}
                  </Typography>
                </div>
              );
            })
          )}
        </div>
      </Popover>
    )
  );
};
