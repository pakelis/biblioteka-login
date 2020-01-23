import React, { useState } from "react";
import { MenuList, Popover, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "250px"
  },
  container: {
    display: "flex",
    minHeight: "100%",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  priorityContainer: {
    display: "flex",
    flexBasis: "50%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  priorityFlagCircle: {
    "&:hover": {
      cursor: "pointer"
    },
    height: "50px",
    width: "42%", //so our flexWrap wraps to another row
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
  setShowPriority,
  priority
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
  const priorityTypes = [
    "High priority",
    "Medium priority",
    "Low priority",
    "No priority"
  ];
  let priorityIndex = 0;

  //TODO when i click flag get priorityNumber like 3 2 1 0???

  return (
    showPriority && (
      <Popover
        classes={{ paper: classes.paper }} // this is how you override component!!!!
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
                <div className={classes.priorityContainer} key={`${i}-${k}`}>
                  <div
                    className={classes.priorityFlagCircle}
                    style={{ backgroundColor: colors[priorityIndex] }}
                    onClick={() => {
                      setFlagGrid(prevGrid =>
                        prevGrid.map((rows, iIndex) =>
                          rows.map((cols, kIndex) => {
                            return;
                          })
                        )
                      );
                      setShowPriority(false);
                    }}
                  >
                    <FlagOutlinedIcon className={classes.flag} />
                  </div>
                  <Typography
                    style={{
                      fontSize: "14px",
                      color: colors[priorityIndex]
                    }}
                  >
                    {priorityTypes[priorityIndex++]}
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
