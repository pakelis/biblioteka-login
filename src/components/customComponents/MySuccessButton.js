import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    color: "white",
    backgroundColor: theme.palette.lightAccent.main,
    "&:hover": {
      backgroundColor: theme.palette.darkAccent.main
    }
  }
}));

export const MySuccessButton = ({ children }) => {
  const classes = useStyles();

  return (
    <Button className={classes.root} variant="contained">
      {children}
    </Button>
  );
};
