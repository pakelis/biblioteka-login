import React from "react";
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MenuList from "@material-ui/core/List";
import MenuItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
//Icons
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";
import SaveIcon from "@material-ui/icons/Save";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import DeleteIcon from "@material-ui/icons/Delete";
import NotesIcon from "@material-ui/icons/Notes";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8)
  },
  listItemText: {
    fontSize: "64px"
  }
}));

export const NavItems = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MenuList>
        <MenuItem button component={Link} to="/home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Namai"} />
        </MenuItem>
        <MenuItem button component={Link} to="/records">
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary={"Irasai"} />
        </MenuItem>
        <MenuItem button>
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText primary={"Issaugoti"} />
        </MenuItem>
        <MenuItem button>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon>
          <ListItemText primary={"Ruosiniai"} />
        </MenuItem>
      </MenuList>
      <Divider />
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
      </MenuList>
    </div>
  );
};
