import { Box, IconButton, Typography, useTheme } from "@mui/material";
import useTasksStore from "@/zustandStorage/tasks";
import { TaskCard } from "./TaskCard";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useState } from "react";
import { useRouter } from "next/router";

function Home() {
  const { palette } = useTheme();
  const tasks = useTasksStore((state: any) => state.tasks);
  const { push } = useRouter();

  console.log();

  const cards = [
    {
      title: "مجموع وظیفه ها",
      content: (
        <Typography
          variant="h3"
          sx={{ mt: 2, alignSelf: "end", color: palette.success.main }}
        >
          {tasks.length} وظیفه
        </Typography>
      ),
    },
    {
      title: "تسک های انجام شده",
      content: (
        <Typography
          variant="h3"
          sx={{ mt: 2, alignSelf: "end", color: palette.warning.main }}
        >
          {tasks.filter((item: any) => item.condition === "done").length} وظیفه
        </Typography>
      ),
    },
    {
      title: "اضافه کنید",
      content: (
        <DatePicker
          editable={false}
          className="rmdp-mobile"
          minDate={new Date()}
          onChange={(event) => {
            push({
              query: {
                add: String(event),
              },
              pathname: "add",
            });
          }}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          render={
            <IconButton
              sx={{
                borderRadius: "8px",
                bgcolor: palette.primary.main,
                "&:hover": { bgcolor: palette.primary.main },
                color: palette.neutral.min,
                width: "100%",
                mt: 2,
              }}
            >
              <Typography variant="button">انتخاب تاریخ</Typography>
            </IconButton>
          }
        />
      ),
    },
  ];

  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 2,
          flexDirection: { md: "row", xs: "column" },
        }}
      >
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
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography>{item.title}</Typography>
              {item.content}
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
            py: { md: 3, xs: 2 },
            overflow: "overlay",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: `1px solid ${palette.neutral[200]}`,
            height: { md: "auto", xs: "450px" },
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
            py: { md: 3, xs: 2 },
            overflow: "overlay",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: `1px solid ${palette.neutral[200]}`,
            height: { md: "auto", xs: "450px" },
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
            py: { md: 3, xs: 2 },
            overflow: "overlay",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: `1px solid ${palette.neutral[200]}`,
            height: { md: "auto", xs: "450px" },
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
            py: { md: 3, xs: 2 },
            overflow: "overlay",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: `1px solid ${palette.neutral[200]}`,
            height: { md: "auto", xs: "450px" },
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
