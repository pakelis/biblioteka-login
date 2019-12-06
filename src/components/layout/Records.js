import React, { useState } from "react";
import { useSelectedProjectValue, useProjectsValue } from "../../context";
//Material
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarBorder from "@material-ui/icons/StarBorder";
import { MenuItem } from "@material-ui/core";
import { IndividualProject } from "./IndividualProject";

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(4),
    "&:hover": {
      // backgroundColor: 'blue'
    }
  }
}));

export const Records = ({ activeValue = null }) => {
  const classes = useStyles();
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    projects &&
    projects.map(project => (
      <MenuItem
        button
        key={project.projectId}
        data-doc-id={project.docId}
        className={classes.root}
        onClick={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
      >
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        {/* we can also pass it as a child like this -
          <IndividualProject> {project} <IndividualProject/> */}
        <IndividualProject project={project} />
      </MenuItem>
    ))
  );
};
