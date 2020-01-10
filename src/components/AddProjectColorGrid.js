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

export const AddProjectColorGrid = ({ selectedColor }) => {
  const classes = useStyles();
  //Making grid of bubbles
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });
  const [randomColorIndex, setRandomColorIndex] = useState(() => {
    let item = grid[Math.floor(Math.random() * grid.length * 5)];
    return item;
  });

  const isAllZero = grid.every(item => item === 0);
  console.log(isAllZero);

  useEffect(() => {
    colorIndex = 0;
    // ComponentDidUpdate && componentDidMount here
  });

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
              style={{
                backgroundColor: colors[colorIndex++],
                border: grid[i][k] ? "solid 2px black" : undefined // if grid[i][k] === 1 , we make it with borders
              }}
              onClick={event => {
                //After click we set all grid to 0
                grid.map((rows, i) =>
                  rows.map((cols, k) => {
                    return (grid[i][k] = 0);
                  })
                );
                //we map through our prevGrid state, and check if it's current index if it is we change it in this grid
                setGrid(prevGrid =>
                  prevGrid.map((numRows, index) => {
                    return index === i
                      ? numRows.map((numCols, kIndex) => {
                          return kIndex === k ? (grid[i][k] = 1) : numCols;
                          /* return kIndex === k && numCols === 0
                            ? 1
                            : kIndex === k && numCols === 1
                            ? 0
                            : numCols; */
                        })
                      : numRows;
                  })
                );
                //We set selectedColor to our clicked div backgroundColor
                selectedColor(event.target.style.backgroundColor);
              }}
            ></div>
          );
        })
      )}
      {isAllZero ? <div>Every item is zero</div> : <div>NO!</div>}
    </div>
  );
};
