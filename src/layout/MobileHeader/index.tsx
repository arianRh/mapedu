import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export default function MobileHeader() {
  const [value, setValue] = React.useState("home");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: "100%", position: "fixed", bottom: 0, right: 0 }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="خانه"
        value="home"
        icon={<HomeRoundedIcon />}
      />
      <BottomNavigationAction
        label="لیست"
        value="list"
        icon={<FormatListBulletedIcon />}
      />
      <BottomNavigationAction
        label="تاریخ"
        value="date"
        icon={<CalendarMonthIcon />}
      />
      <BottomNavigationAction
        label="افزودن"
        value="add"
        icon={<AddCircleOutlineRoundedIcon />}
      />
    </BottomNavigation>
  );
}
