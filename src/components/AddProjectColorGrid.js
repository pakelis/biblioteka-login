import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridColumnGap: "6px",
    gridRowGap: "5px",
    paddingTop: "15px",
    paddingBottom: "15px",
    justifyContent: "center"
  },
  bubble: {
    color: "red",
    height: "35px",
    width: "35px",
    borderRadius: "50%"
  }
}));

let colorIndex = 0;
const numRows = 3;
const numCols = 5;
const colors = [
  "blueviolet",
  "khaki",
  "crimson",
  "dimgray",
  "olivedrab",
  "violet",
  "gold",
  "salmon",
  "darkorange",
  "olive",
  "teal",
  "purple",
  "indigo",
  "hotpink",
  "saddlebrown",
  "sandybrown"
];

export const AddProjectColorGrid = () => {
  const classes = useStyles();
  //Making grid of bubbles
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });
  const [selectedColor, setSelectedColor] = useState(() => {
    let item = grid[Math.floor(Math.random() * grid.length * 5)];
    return item;
  });

  const colorPick = () => {};

  useEffect(() => {
    colorIndex = 0; // whenever component mounts we change colorIndex to 0 so we get all the colors
  }, []);

  return (
    <div
      className={classes.container}
      style={{ gridTemplateColumns: `repeat(${numCols}, 35px)` }} // Using css grid to make grid of bubbles
    >
      {grid.map((rows, i) =>
        rows.map((cols, k) => {
          return (
            <div
              key={`${i}-${k}`}
              className={classes.bubble}
              style={{ backgroundColor: colors[colorIndex++] }}
            ></div>
          );
        })
      )}
    </div>
  );
};
