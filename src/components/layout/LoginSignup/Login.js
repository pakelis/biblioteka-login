import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { firebase } from "../../../firebase";
import { AuthContext } from "../../../Auth";
import { Link as RouterLink } from "react-router-dom";
import { useUserValue } from "../../../Auth";
//TODO i need to make all buttons , textfields same css to look sharp and clean so i dont have to repeat

//MATERIAL
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Container,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Link
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paperContent: {
    padding: "20px"
  },
  mainText: {
    textAlign: "center",
    marginBottom: theme.spacing(2)
  },
  avatar: {
    color: theme.palette.primary.main,
    fontSize: "8em"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 3)
  },
  icon: {
    color: theme.palette.darkShade.main
  },
  smallText: {
    color: theme.palette.darkShade.main
  }
}));

const Link1 = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/signup" {...props} />
));

const Login = ({ history }) => {
  const [checkBox, setCheckBox] = useState(false);
  //Using currentUser from context hook
  const { currentUser } = useUserValue();

  const toggleRememberMe = () => {
    setCheckBox(!checkBox);
  };
  //history prop we get using withRouter
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        //we get history from props so we can redirect to different route
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  //Using styles hook from material
  const classes = useStyles();

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.mainContainer}>
      <Container component="div" maxWidth="sm" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <AccountCircleIcon className={classes.avatar} />
          <div className={classes.paperContent}>
            <Typography variant="h4" className={classes.mainText}>
              Sign in
            </Typography>
            <form onSubmit={handleLogin} className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="login-email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon className={classes.icon} />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="login-password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon className={classes.icon} />
                    </InputAdornment>
                  )
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={toggleRememberMe}
                    value="remember"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                size="large"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" className={classes.smallText}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    variant="body2"
                    component={Link1}
                    className={classes.smallText}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default withRouter(Login);
