import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import TurnedInRoundedIcon from "@mui/icons-material/TurnedInRounded";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SchoolIcon from "@mui/icons-material/School";
import { useState } from "react";
import moment from "jalali-moment";
import useTasksStore from "@/zustandStorage/tasks";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface ItemProps {
  title: string;
  description: string;
  date: string;
  priority: string;
  type: string;
  id: string;
}

export const TaskCard = ({ item }: ItemProps | any) => {
  const { palette } = useTheme();
  const { push } = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const removeTodo = useTasksStore((state: any) => state.removeTodo);
  const open = Boolean(anchorEl);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const condition = (title: string) => {
    switch (title) {
      case "todo":
        return "انجام دادن";
        break;
      case "inProgress":
        return "درحال انجام";
        break;
      case "complete":
        return "مورد تایید";
        break;
      case "done":
        return "انجام شده";
        break;
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 4,
        bgcolor: palette.neutral.min,
        p: 2,
        border: `1px solid ${palette.neutral[300]}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            lineHeight: "26px",
            color: palette.neutral[700],
            mb: 1,
          }}
        >
          {item.title}
        </Typography>
        <TurnedInRoundedIcon
          sx={{
            color:
              item.priority == "urgent"
                ? palette.error.main
                : item.priority == "high"
                ? palette.warning.main
                : item.priority == "normal"
                ? palette.primary.main
                : item.priority == "low"
                ? palette.neutral[300]
                : palette.neutral[900],
            mr: 1,
          }}
        />
      </Box>
      <Typography
        sx={{
          mt: 1,
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
          lineHeight: "26px",
          color: palette.neutral[700],
          maxHeight: "75px",
          mb: 1,
        }}
      >
        {item.description}
      </Typography>
      <Typography variant="button" sx={{ color: palette.neutral[400] }}>
        {moment(new Date(item.date), "YYYY/MM/DD")
          .locale("fa")
          .format("YYYY/MM/DD")}
      </Typography>
    </Box>
  );
};
