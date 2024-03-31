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
        border: `1px solid ${palette.neutral[300]}`,
        p: 4,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", gap: "16px", width: "100%" }}>
        <Box
          sx={{
            bgcolor:
              item.type == "work"
                ? palette.error.light
                : item.type == "personal"
                ? palette.primary[50]
                : palette.success.light,
            borderRadius: 2,
            minWidth: "100px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.type == "work" ? (
            <WorkOutlineRoundedIcon
              sx={{ fontSize: "80px", color: palette.error.main }}
            />
          ) : item.type == "personal" ? (
            <PersonOutlineIcon
              sx={{ fontSize: "80px", color: palette.primary.main }}
            />
          ) : (
            <SchoolIcon
              sx={{ fontSize: "80px", color: palette.success.main }}
            />
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Typography variant="subtitle1">{item.title} </Typography>
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  ml: 1,
                  bgcolor: palette.primary[50],
                  px: 2,
                  borderRadius: 8,
                }}
              >
                <Typography variant="button">
                  {condition(item.condition)}
                </Typography>
              </Box>
              <Typography variant="button" sx={{ ml: 1 }}>
                {moment(new Date(item.date), "YYYY/MM/DD")
                  .locale("fa")
                  .format("YYYY/MM/DD")}
              </Typography>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ p: "4px !important" }}
              >
                <MoreVertRoundedIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    push({ query: { edit: item.id }, pathname: "add" });
                  }}
                  value={"edit"}
                >
                  ویرایش
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setDeleteModal(true);
                    setAnchorEl(null);
                  }}
                  value={"delete"}
                >
                  حذف
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Typography variant="button">{item.description}</Typography>
        </Box>
      </Box>
      <Modal
        open={deleteModal}
        onClose={() => {
          setDeleteModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ایا میخواهید این وظیفه را حذف کنید؟
          </Typography>
          <Box sx={{ display: "flex", mt: 4 }}>
            <IconButton
              sx={{
                py: "8px !important",
                px: "16px !important",
                borderRadius: "4px",
                color: palette.neutral[900],
              }}
              onClick={() => {
                setDeleteModal(false);
              }}
            >
              <Typography>انصراف</Typography>
            </IconButton>
            <IconButton
              sx={{
                py: "8px !important",
                px: "16px !important",
                borderRadius: "4px",
                color: palette.error.main,
                mr: 2,
              }}
              onClick={() => {
                removeTodo(item.id);
                toast.success("با موفقیت انجام شد");
                setDeleteModal(false);
              }}
            >
              <Typography>حذف</Typography>
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
