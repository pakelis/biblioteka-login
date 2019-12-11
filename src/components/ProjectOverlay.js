import React, {useState} from 'react'
import {useProjectsValue} from '../context'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {List, ListItem} from '@material-ui/core'

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
  anchorEl,
}) => {
  const {projects} = useProjectsValue()

  return (
    projects &&
    showProjectOverlay && (
      <div>
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          // elevation={0}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          {projects.map(project => (
            <MenuItem
              key={project.projectId}
              onClick={() => {
                setProject(project.projectId)
                setShowProjectOverlay(false)
              }}
            >
              {project.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  )
}
