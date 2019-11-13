import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  textBlock: {
    maxWidth: 700,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

export const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.textBlock}>
      <Typography variant="h3">Home</Typography>
    </div>
  );
};
