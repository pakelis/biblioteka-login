import React, { useState } from "react";
import { MenuList, Popover, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";

const useStyles = makeStyles(theme => ({
  priorityFlagContainer: {
    height: "50px",
    width: "50px",
    backgroundColor: "#bbb",
    borderRadius: "25%"
  },
  flag: {
    color: "white",
    position: "relative",
    top: "10px",
    left: "12.5px"
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

  return (
    showPriority && (
      <Popover
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
        {flagGrid.map((rows, i) =>
          rows.map((cols, k) => {
            return (
              <div className={classes.priorityFlagContainer} key={`${i}-${k}`}>
                <FlagOutlinedIcon className={classes.flag} />
              </div>
            );
          })
        )}
      </Popover>
    )
  );
};
