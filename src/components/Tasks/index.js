import React, {useState, useEffect} from 'react'
import {Typography, Checkbox} from '@material-ui/core'
import {useTasks} from '../../hooks'
//Material
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import CommentIcon from '@material-ui/icons/Comment'

const useStyles = makeStyles(theme => ({
  root: {
    wdith: '100%',
    maxWidth: 360,
  },
}))

//timestamp 1:12

export const Tasks = () => {
  const classes = useStyles()
  const {tasks} = useTasks('1') // gets all the tasks from our useTasks hook in /hooks
  const [checked, setChecked] = useState([0])

  const handleToggle = value => () => {
    // const currentIndex = checked.indexOf(value)
  }

  return (
    <List className={classes.root}>
      {tasks.map(task => (
        <ListItem key={task.id} dense button>
          <ListItemIcon>
            <Checkbox edge="start" checked disableRipple />
          </ListItemIcon>
          <ListItemText primary={task.task} />
        </ListItem>
      ))}
    </List>
  )
}
