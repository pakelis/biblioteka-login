import React from "react";
import {
  MenuItem,
  MenuList,
  Typography,
  List,
  ListItem,
  Popover
} from "@material-ui/core";
import moment from "moment";
import NextWeekOutlinedIcon from "@material-ui/icons/NextWeekOutlined";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import NotInterestedOutlinedIcon from "@material-ui/icons/NotInterestedOutlined";

export const TaskDate = ({
  setTaskDate,
  showTaskDate,
  setShowTaskDate,
  anchorEl
}) =>
  showTaskDate && (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <MenuList>
        <MenuItem
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().format("DD/MM/YYYY"));
          }}
        >
          <AccessTimeOutlinedIcon color="action" />
          <Typography style={{ marginLeft: "10px" }}> Today</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(
              moment()
                .add(1, "day")
                .format("DD/MM/YYYY")
            );
          }}
        >
          <TodayOutlinedIcon color="action" />
          <Typography style={{ marginLeft: "10px" }}> Tomorrow</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(
              moment()
                .add(7, "days")
                .format("DD/MM/YYYY")
            );
          }}
        >
          <NextWeekOutlinedIcon color="action" />
          <Typography style={{ marginLeft: "10px" }}> Next week</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate("");
          }}
        >
          <NotInterestedOutlinedIcon color="action" />
          <Typography style={{ marginLeft: "10px" }}>No date</Typography>
        </MenuItem>
      </MenuList>
    </Popover>
  );
