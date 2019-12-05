import React, { useState } from "react";
import { useSelectedProjectValue, useProjectsValue } from "../../context";
//Material
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarBorder from "@material-ui/icons/StarBorder";
import { MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  menuItemRoot: {
    paddingLeft: theme.spacing(4),
    "&$menuItemSelected, &$menuItemSelected:focus, &$menuItemSelected:hover": {
      backgroundColor: "blue"
    }
  },
  menuItemSelected: {}
}));

export const Records = ({ activeValue = null }) => {
  const classes = useStyles();
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  console.log("projects", projects);

  return (
    projects &&
    projects.map(project => (
      <MenuItem
        button
        key={project.recordId}
        data-doc-id={project.docId}
        className={
          active === project.recordId
            ? "active sidebar__project"
            : "sidebar__project"
        }
        className={classes.root}
        onClick={() => {
          setActive(project.recordId);
          setSelectedProject(project.recordId);
        }}
        selected={active}
      >
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary={project.name} />
      </MenuItem>
    ))
  );
};
