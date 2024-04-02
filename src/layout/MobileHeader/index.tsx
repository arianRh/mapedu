import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useRouter } from "next/router";

export default function MobileHeader() {
  const [value, setValue] = React.useState("/");
  const { push } = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    push(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: 999,
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="خانه"
        value="/"
        icon={<HomeRoundedIcon />}
      />
      <BottomNavigationAction
        label="لیست"
        value="lists"
        icon={<FormatListBulletedIcon />}
      />
      <BottomNavigationAction
        label="افزودن"
        value="add"
        icon={<AddCircleOutlineRoundedIcon />}
      />
    </BottomNavigation>
  );
}
