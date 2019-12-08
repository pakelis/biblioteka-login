import React, {useState} from 'react'
import {firebase} from '../firebase'
import {generatePushId} from '../helpers'
import {useProjectsValue} from '../context'
import {Typography, Button} from '@material-ui/core'

export const AddProject = ({shouldShow = false}) => {
  const [show, setShow] = useState(shouldShow)
  const [projectName, setProjectName] = useState('')

  const projectId = generatePushId()
  const {setProjects} = useProjectsValue()

  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection('projects')
        .add({
          projectId,
          name: projectName,
          userId: 'abc001',
        })
        .then(() => {
          setProjects([])
          setProjectName('')
          setShow(false)
        })
  }

  return (
    <div>
      {show && (
        <div>
          <input
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            type="text"
            placeholder="Name your project"
          />
          <Button onClick={() => addProject()}>Add Project</Button>
          <Button onClick={() => setShow(false)}>Cancel</Button>
        </div>
      )}
      <Typography>+</Typography>
      <Typography onClick={() => setShow(!show)}>Add Project</Typography>
    </div>
  )
}
