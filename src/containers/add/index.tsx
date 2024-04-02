import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import useTasksStore from "../../zustandStorage/tasks";
import * as Yup from "yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useEffect, useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import "react-multi-date-picker/styles/layouts/mobile.css";
import moment from "jalali-moment";

interface EditProps {
  title: string;
  description: string;
  condition: string;
  date: string;
  id: string;
  priority: string;
  type: string;
}

export const Add = () => {
  const { palette } = useTheme();
  const router = useRouter();
  const addTask = useTasksStore((state) => state.addTask);
  const updateTask = useTasksStore((state) => state.inc);
  const tasks = useTasksStore((state) => state.tasks);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string | Date | any>(
    router.query.add ? router.query.add : new Date()
  );
  const [priority, setPriority] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [edit, setEdit] = useState<EditProps>();

  useEffect(() => {
    if (router.query.edit) {
      tasks.filter((a: any) => {
        if (a.id === router.query.edit) {
          setEdit(a);
          setPriority(a.priority);
          setType(a.type);
          setCondition(a.condition);
          setDate(a.date);
        }
      });
    }
  }, [router.query]);

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
  ];

  const conditionCases = [
    {
      title: "انجام دادن",
      value: "todo",
    },
    {
      title: "در حال انجام",
      value: "inProgress",
    },
    {
      title: "مورد تایید",
      value: "complete",
    },
    {
      title: "انجام شده",
      value: "done",
    },
  ];

  const typeCases = [
    {
      title: "کاری",
      value: "work",
      icon: <WorkIcon />,
    },
    {
      title: "شخصی",
      value: "personal",
      icon: <PersonIcon />,
    },
    {
      title: "اموزشی",
      value: "learning",
      icon: <SchoolIcon />,
    },
  ];

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };
  const handleConditionChange = (event: SelectChangeEvent) => {
    setCondition(event.target.value as string);
  };
  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  const SignupSchema = Yup.object().shape({
    title: Yup.string()
      .min(8, "حداقل 8 کاراکتر")
      .max(80, "حداکثر 80 کاراکتر")
      .required("اجباری"),
    description: Yup.string()
      .min(20, "حداقل 20 کاراکتر")
      .max(350, "حداکثر 350 کاراکتر")
      .required("اجباری"),
    priority: Yup.string().required("اجباری"),
    condition: Yup.string().required("اجباری"),
    type: Yup.string().required("اجباری"),
  });
  const handleAddTask = (values: any) => {
    if (edit) {
      updateTask({
        title: values.title,
        description: values.description,
        condition: values.condition,
        type: values.type,
        priority: priority,
        date: router.query.add
          ? date
          : moment(new Date(date), "YYYY/MM/DD")
              .locale("fa")
              .format("YYYY/MM/DD"),
        id: edit.id,
      });
    } else {
      addTask({
        title: values.title,
        description: values.description,
        condition: values.condition,
        type: values.type,
        priority: priority,
        date: router.query.add
          ? date
          : moment(new Date(date), "YYYY/MM/DD")
              .locale("fa")
              .format("YYYY/MM/DD"),
        id: crypto.randomUUID(),
      });
    }
    toast.success("با موفقیت انجام شد");
  };

  return (
    <>
      <Typography variant="h4">افزودن وظیفه</Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="78vh"
        sx={{ pb: 10, mt: { xs: 3, md: 0 } }}
      >
        <Box
          sx={{
            p: { xs: 0, md: 5 },
            boxShadow: {
              md: " 0 4px 15px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.02)",
            },
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
            width: "500px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bgcolor: palette.primary[800],
              borderRadius: "100%",
              width: "60px",
              height: "60px",
              display: { md: "flex", xs: "none" },
              alignItems: "center",
              justifyContent: "center",
              mt: -4,
              mr: -8,
            }}
          >
            <PlaylistAddRoundedIcon
              sx={{
                fontSize: "40px",
                color: palette.neutral.min,
              }}
            />
          </Box>
          <Grid container>
            <Formik
              enableReinitialize
              initialValues={{
                title: edit ? edit.title : title,
                description: edit ? edit.description : description,
                date: edit ? edit.date : date,
                priority: edit ? edit.priority : priority,
                condition: edit ? edit.condition : condition,
                type: edit ? edit.type : type,
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleAddTask(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "16px",
                  }}
                >
                  <Grid item xs={12} md={12}>
                    <Field
                      type="title"
                      name="title"
                      onChange={(event: any) => {
                        setTitle(event.target.value);
                        setFieldValue("title", event.target.value);
                      }}
                      placeholder="عنوان وظیفه"
                      as={OutlinedInput}
                      color="primary"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="formik-error"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Field
                      type="description"
                      name="description"
                      onChange={(event: any) => {
                        setDescription(event.target.value);
                        setFieldValue("description", event.target.value);
                      }}
                      placeholder="توضیحات"
                      as={OutlinedInput}
                      multiline
                      rows={5}
                      color="primary"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="formik-error"
                    />
                  </Grid>
                  <Grid container sx={{ display: "flex" }}>
                    <Grid item md={6} xs={12} sx={{ pl: { md: 2 } }}>
                      <DatePicker
                        editable={false}
                        className="rmdp-mobile"
                        value={date}
                        minDate={new Date()}
                        onChange={setDate}
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        render={
                          <Field
                            placeholder="تاریخ"
                            as={OutlinedInput}
                            color="primary"
                            sx={{
                              width: "100%",
                            }}
                          />
                        }
                      />
                    </Grid>
                    <Grid item md={6} xs={12} sx={{ mt: { xs: 2, md: 0 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Field
                          type="priority"
                          name="priority"
                          color="primary"
                          sx={{
                            width: "100%",
                          }}
                          render={() => (
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                الویت
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priority}
                                sx={{ height: "55px" }}
                                onChange={(event) => {
                                  handlePriorityChange(event);
                                  setFieldValue("priority", event.target.value);
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
                                    {item.title}{" "}
                                    <BookmarkIcon sx={{ color: item.color }} />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        />
                      </Box>
                      <ErrorMessage
                        name="priority"
                        component="div"
                        className="formik-error"
                      />
                    </Grid>
                  </Grid>
                  <Grid container sx={{ display: "flex" }}>
                    <Grid
                      item
                      md={6}
                      xs={12}
                      sx={{
                        justifyContent: "space-between",
                        pl: { md: 2 },
                      }}
                    >
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          وضعیت
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={condition}
                          onChange={(event) => {
                            handleConditionChange(event);
                            setFieldValue("condition", event.target.value);
                          }}
                        >
                          {conditionCases.map((item, index) => (
                            <MenuItem key={index} value={item.value}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <ErrorMessage
                        name="condition"
                        component="div"
                        className="formik-error"
                      />
                    </Grid>
                    <Grid item md={6} xs={12} sx={{ mt: { md: 0, xs: 2 } }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          نوع
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={type}
                          onChange={(event) => {
                            handleTypeChange(event);
                            setFieldValue("type", event.target.value);
                          }}
                          sx={{ height: "55px" }}
                        >
                          {typeCases.map((item, index) => (
                            <MenuItem
                              key={index}
                              value={item.value}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              {item.title}
                              {item.icon}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <ErrorMessage
                        name="type"
                        component="div"
                        className="formik-error"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    sx={{ mt: 2, position: "relative" }}
                  >
                    <Typography variant="h6">
                      {edit ? "ویرایش" : "اضافه کردن"}
                    </Typography>
                  </Button>
                </Form>
              )}
            </Formik>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
