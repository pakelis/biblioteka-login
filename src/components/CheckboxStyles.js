import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

export const GreenCheckbox = withStyles({
  root: {
    color: "#579a52",
    "&$checked": {
      color: "#457b41"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

export const GreyCheckbox = withStyles({
  root: {
    color: "#707070",
    "&$checked": {
      color: "#595959"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

export const YellowCheckbox = withStyles({
  root: {
    color: "#d48a1a",
    "&$checked": {
      color: "#be7c17"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

export const RedCheckbox = withStyles({
  root: {
    color: "#f44336",
    "&$checked": {
      color: "#c3352b"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);
