import React from "react";

//Material
import {
  Button,
  makeStyles,
  Typography,
  Container,
  CssBaseline
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  overlayPanelLeft: {
    backgroundColor: theme.palette.darkAccent.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0px 40px",
    textAlign: "center",
    height: "100%",
    color: "#FFF",
    fontSize: "18px"
  },
  button: {
    // color: '#fff',
    // borderColor: '#fff !important',
  },
  typography: {
    padding: "20px 0"
  }
}));

export const OverlaySignUp = ({ toggleClick }) => {
  const classes = useStyles();

  return (
    <Container className={classes.overlayPanelLeft} maxWidth="sm">
      <CssBaseline />
      <Typography variant="h3">Hello, Friend!</Typography>
      <Typography className={classes.typography}>
        Enter your personal details and start journey with us
      </Typography>
      <Button
        onClick={toggleClick}
        size="large"
        variant="outlined"
        color="inherit"
        className={classes.button}
      >
        Sign Up
      </Button>
    </Container>
  );
};

export default OverlaySignUp;
