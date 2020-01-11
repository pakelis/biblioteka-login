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
  const randomColorIndex = Math.floor(Math.random() * 15); // just random number between 1 - 15
  //Making grid of bubbles
  const [grid, setGrid] = useState(() => {
    let indx = 0;
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    //We set random bubble to selected Bubble
    rows.map((row, i) =>
      row.map((col, k) => {
        indx++;
        return randomColorIndex === indx
          ? (rows[i][k] = 1) && selectedColor(colors[indx - 1])
          : 0;
      })
    );
    return rows;
  });

  const isAllZero = grid.every(row => row.every(item => item === 0)); // check if every item is 0 in our grid
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
                          return kIndex === k
                            ? (grid[index][kIndex] = 1)
                            : numCols;
                          /* return kIndex === k && numCols === 0 //TOGGLE
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
    </div>
  );
};
