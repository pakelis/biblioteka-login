import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridColumnGap: '6px',
    gridRowGap: '5px',
    paddingTop: '15px',
    paddingBottom: '15px',
    justifyContent: 'center',
  },
  bubble: {
    color: 'red',
    height: '35px',
    width: '35px',
    borderRadius: '50%',
  },
}))

let colorIndex = 0
const numRows = 3
const numCols = 5
const colors = [
  'blueviolet',
  'khaki',
  'crimson',
  'dimgray',
  'olivedrab',
  'violet',
  'gold',
  'salmon',
  'darkorange',
  'olive',
  'teal',
  'purple',
  'indigo',
  'hotpink',
  'saddlebrown',
  'sandybrown',
]

export const AddProjectColorGrid = () => {
  const classes = useStyles()
  //Making grid of bubbles
  const [grid, setGrid] = useState(() => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }

    return rows
  })
  const [selectedColor, setSelectedColor] = useState(() => {
    let item = grid[Math.floor(Math.random() * grid.length * 5)]
    return item
  })

  const selectedBubble = () => {}

  useEffect(() => {
    // we change colorIndex , so we always get the same colors
    colorIndex = 0
  })
  // we don't pass second parameter so it's same as componentDidMount & componentDidUpdate

  return (
    <div
      className={classes.container}
      style={{gridTemplateColumns: `repeat(${numCols}, 35px)`}} // Using css grid to make grid of bubbles
    >
      {grid.map((rows, i) =>
        rows.map((cols, k) => {
          return (
            <div
              key={`${i}-${k}`}
              className={classes.bubble}
              style={{
                backgroundColor: colors[colorIndex++],
                border: grid[i][k] ? 'solid 1px black' : undefined,
              }}
              onClick={() => {
                setGrid(prevGrid =>
                  prevGrid.map((gridRow, index) =>
                    index === i
                      ? gridRow.map((gridCol, kIndex) => {
                          console.log(gridCol)
                          return kIndex === k ? 1 : gridCol
                        })
                      : gridRow,
                  ),
                )
              }}
            ></div>
          )
        }),
      )}
    </div>
  )
}
