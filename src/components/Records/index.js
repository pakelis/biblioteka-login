import React, { useState } from "react";
import { Typography } from "@material-ui/core";

export const Records = ({ activeValue = true }) => {
  const [active, setActive] = useState(activeValue);
  return (
    <div>
      <Typography variant="h3">Records</Typography>
    </div>
  );
};
