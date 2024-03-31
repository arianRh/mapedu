import { Box, Typography, useTheme } from "@mui/material";
import TurnedInRoundedIcon from "@mui/icons-material/TurnedInRounded";
import useTasksStore from "@/zustandStorage/tasks";
import moment from "jalali-moment";
import { TaskCard } from "./TaskCard";

function Home() {
  const { palette } = useTheme();
  const tasks = useTasksStore((state: any) => state.tasks);

  const cards = [
    { title: "مجموع ساعات" },
    { title: "تسک های انجام شده" },
    { title: "اضافه کنید" },
  ];

  // let time = 135;
  // var Hours = Math.floor(time / 60);
  // var minutes = time % 60;

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ width: "100%", display: { md: "flex" }, gap: 2 }}>
        {cards.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                width: { md: "100%" },
                bgcolor: palette.neutral[100],
                borderRadius: 6,
                py: 2,
                px: { md: 4, xs: 2 },
                height: { md: 100 },
              }}
            >
              <Typography>{item.title}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: { md: "100%", xs: "1200px" },
          maxHeight: { md: "100%", xs: "1200px" },
          my: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { md: "16px", xs: "32px" },
          pb: { xs: "80px", md: 0 },
        }}
      >
        <Box
          sx={{
            bgcolor: palette.warning.light,
            width: { md: "100%" },
            borderRadius: 6,
            px: 2,
            py: 3,
            overflow: "overlay",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: `1px solid ${palette.neutral[200]}`,
          }}
          className="custom-scrollbars__content"
        >
          <Typography variant="subtitle1" sx={{ color: palette.warning.main }}>
            انجام دادن
          </Typography>
          {tasks.map((item: any, index: number) => {
            if (item.condition === "todo")
              return (
                <Box key={index}>
                  <TaskCard item={item} />
                </Box>
              );
          })}
        </Box>
        <Box
          sx={{
            bgcolor: palette.secondary[50],
            width: { md: "100%" },
            borderRadius: 6,
            px: 2,
            py: 3,
            overflow: "overlay",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: `1px solid ${palette.neutral[200]}`,
          }}
          className="custom-scrollbars__content"
        >
          <Typography
            variant="subtitle1"
            sx={{ color: palette.secondary[500] }}
          >
            درحال انجام
          </Typography>
          {tasks.map((item: any, index: number) => {
            if (item.condition === "inProgress")
              return (
                <Box key={index}>
                  <TaskCard item={item} />
                </Box>
              );
          })}
        </Box>
        <Box
          sx={{
            bgcolor: palette.success.light,
            width: { md: "100%" },
            borderRadius: 6,
            px: 2,
            py: 3,
            overflow: "overlay",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: `1px solid ${palette.neutral[200]}`,
          }}
          className="custom-scrollbars__content"
        >
          <Typography variant="subtitle1" sx={{ color: palette.success.main }}>
            مورد تایید
          </Typography>
          {tasks.map((item: any, index: number) => {
            if (item.condition === "complete")
              return (
                <Box key={index}>
                  <TaskCard item={item} />
                </Box>
              );
          })}
        </Box>
        <Box
          sx={{
            bgcolor: palette.error.light,
            width: { md: "100%" },
            borderRadius: 6,
            px: 2,
            py: 3,
            overflow: "overlay",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: `1px solid ${palette.neutral[200]}`,
          }}
          className="custom-scrollbars__content"
        >
          <Typography variant="subtitle1" sx={{ color: palette.error.main }}>
            انجام شده
          </Typography>
          {tasks.map((item: any, index: number) => {
            if (item.condition === "done")
              return (
                <Box key={index}>
                  <TaskCard item={item} />
                </Box>
              );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
