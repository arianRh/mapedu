import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useRouter } from "next/router";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `58px`,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const Header = () => {
  const { palette } = useTheme();
  const { push } = useRouter();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState<string | undefined>("/");

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={open}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            bgcolor: "#160FCA",
          },
        }}
      >
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ width: "43px", height: "43px", color: "white" }}
          >
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {[
            { item: "خانه", icon: <HomeRoundedIcon />, route: "/" },
            { item: "لیست", icon: <FormatListBulletedIcon />, route: "/lists" },
            {
              item: "افزودن",
              icon: <AddCircleOutlineRoundedIcon />,
              route: "/add",
            },
          ].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 60,
                  width: "100%",
                  textAlign: "start",
                  color: page === text.route ? "#160FCA" : palette.neutral.min,
                  bgcolor: page === text.route ? palette.neutral.min : "",
                  "&:hover": {
                    bgcolor:
                      page === text.route ? palette.neutral.min : "#160FAA",
                  },
                }}
                onClick={() => {
                  setPage(text.route);
                  push(text.route);
                }}
              >
                <ListItemText
                  primary={text.item}
                  sx={{ opacity: open ? 1 : 0 }}
                />
                <ListItemIcon
                  sx={{
                    justifyContent: open ? "end" : "",
                    color:
                      page === text.route ? "#160FCA" : palette.neutral.min,
                  }}
                >
                  {text.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
