import React, {useState} from 'react'
import {FaRegListAlt, FaRegCalendarAlt} from 'react-icons/fa'
import moment from 'moment'
import {firebase} from '../firebase'
import {useSelectedProjectValue} from '../context'

export const AddTask = ({
  showAddTaskMain = true,
  showShouldMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [project, setProject] = useState('')
  const [showMain, setShowMain] = useState(showShouldMain)
  const [showProjectOverlay, setShowProjectOverlay] = useState(false)
  const [showTaskDate, setShowTaskDate] = useState(false)

  const {selectedProject} = useSelectedProjectValue()

  const addTask = () => {
    const projectId = project || selectedProject
    let collatedDate = ''

    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY')
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment()
        .add(7, 'days')
        .format('DD/MM/YYYY')
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: 'false',
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: 'abc001',
        })
        .then(() => {
          setTask('')
          setProject('')
          setShowMain('')
          setShowProjectOverlay(false)
        })
    )
  }

  return (
    <div>
      {showAddTaskMain && (
        <div></div>
        //Timestamp 2:58
      )}
    </div>
  )
}
