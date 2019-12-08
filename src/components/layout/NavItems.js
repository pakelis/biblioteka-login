import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MenuList from "@material-ui/core/List";
import MenuItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
//Icons
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";
import SaveIcon from "@material-ui/icons/Save";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import DeleteIcon from "@material-ui/icons/Delete";
import NotesIcon from "@material-ui/icons/Notes";
import { useSelectedProjectValue } from "../../context";
import { width } from "@material-ui/system";
import { Records } from "../Records";

//TODO make every menu item selected when i click on it (make it bold or smth)

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8)
  },
  listItem: {
    paddingRight: theme.spacing(8)
  },
  active: {
    fontWeight: ""
  }
}));

export const NavItems = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState("inbox");
  const [showProjects, setShowProjects] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <MenuList>
        {/* if we want to make as a Link , we add - component={Link} to="/home" */}
        <MenuItem
          button
          className={classes.listItem}
          onClick={() => {
            setActive("inbox");
            setSelectedProject("INBOX");
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Inbox"} />
        </MenuItem>
        <MenuItem
          button
          className={classes.listItem}
          onClick={() => {
            setActive("today");
            setSelectedProject("TODAY");
          }}
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary={"Today"} />
        </MenuItem>
        <MenuItem
          button
          className={classes.listItem}
          onClick={() => {
            setActive("next 7");
            setSelectedProject("NEXT_7");
          }}
        >
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText primary={"Next 7 days"} />
        </MenuItem>
        <MenuItem button onClick={handleClick} className={classes.listItem}>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon>
          <ListItemText primary={"Records"} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <MenuList component="div" disablePadding>
            <Records />
          </MenuList>
        </Collapse>
      </MenuList>
      {/* <Divider /> // we dont need that many RN 
      <MenuList>
        <MenuItem button>
          <ListItemIcon>
            <NotesIcon />
          </ListItemIcon>
          <ListItemText primary={"Uzrasai"} />
        </MenuItem>
        <MenuItem button>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={"Istrinti irasai"} />
        </MenuItem>
      </MenuList> */}
    </div>
  );
};
