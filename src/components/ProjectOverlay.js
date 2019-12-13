import React, { useState } from "react";
import { useProjectsValue } from "../context";
import MenuItem from "@material-ui/core/MenuItem";
import { MenuList, Popover } from "@material-ui/core";

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
  anchorEl
}) => {
  const { projects } = useProjectsValue();

  return (
    projects &&
    showProjectOverlay && (
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
        <MenuList>
          {projects.map(project => (
            <MenuItem
              key={project.projectId}
              onClick={() => {
                setProject(project.projectId);
                setShowProjectOverlay(false);
              }}
            >
              {project.name}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    )
  );
};
