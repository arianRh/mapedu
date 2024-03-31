import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TaskCard } from "./components/TaskCard";
import useTasksStore from "@/zustandStorage/tasks";
import { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";

interface ItemProps {
  title: string;
  description: string;
  date: string;
  priority: string;
  type: string;
  id: string;
}

export const Lists = () => {
  const { palette } = useTheme();
  const tasks = useTasksStore((state: any) => state.tasks);
  const [serachQuery, serSearchQuery] = useState<string>("");
  const [priority, serPriority] = useState<string>("");

  const filtered = tasks.filter((entry: any) =>
    Object.values(entry).some(
      (val) =>
        typeof val === "string" &&
        val.toLocaleLowerCase().includes(priority.toLocaleLowerCase()) &&
        val.toLocaleLowerCase().includes(serachQuery.toLocaleLowerCase())
    )
  );

  const priorityCase = [
    {
      title: "فوری",
      value: "urgent",
      color: palette.error.main,
    },
    {
      title: "بالا",
      value: "high",
      color: palette.warning.main,
    },
    {
      title: "معمولی",
      value: "normal",
      color: palette.primary.main,
    },
    {
      title: "کم",
      value: "low",
      color: palette.neutral[300],
    },
    {
      title: "همه",
      value: "",
      color: palette.neutral[900],
    },
  ];
  const SignupSchema = Yup.object().shape({
    password: Yup.string().min(8, "حدال 8 کاراکتر").required("اجباری"),
    email: Yup.string().email("ایمیل نادرست است").required("اجباری"),
  });

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4">لیست وظایف</Typography>
      </Box>
      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          mt: 3,
          alignItems: "start",
        }}
        columnSpacing={3}
      >
        <Grid item md={6} xs={12}>
          <Formik
            enableReinitialize
            initialValues={{ title: serachQuery }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, validateOnChange }) => (
              <Form>
                <Field
                  type="title"
                  name="title"
                  placeholder="پیدا کردن وظیفه"
                  as={OutlinedInput}
                  color="primary"
                  onChange={(event: any) => {
                    serSearchQuery(event.target.value);
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="formik-error"
                />
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid md={2} sx={{ display: "flex", justifyContent: "end" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">الویت</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              sx={{ height: "57px" }}
              onChange={(event) => {
                serPriority(event.target.value);
              }}
            >
              {priorityCase.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.value}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.title} <BookmarkIcon sx={{ color: item.color }} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: 3,
          maxHeight: "100%",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          overflowY: "overlay",
        }}
        // className="custom-scrollbars__content"
      >
        {(serachQuery && filtered.length < 1) || tasks.length < 1 ? (
          <Box
            sx={{
              display: "flex",
              minHeight: "60vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h1">موردی یافت نشد</Typography>
          </Box>
        ) : serachQuery || priority ? (
          filtered.map((item: object, index: number) => {
            return (
              <Box key={index}>
                <TaskCard item={item} />
              </Box>
            );
          })
        ) : (
          tasks.map((item: object, index: number) => {
            return (
              <Box key={index}>
                <TaskCard item={item} />
              </Box>
            );
          })
        )}
      </Box>
    </>
  );
};
