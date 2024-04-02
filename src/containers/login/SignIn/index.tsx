import {
  Box,
  Button,
  Modal,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useState } from "react";
import useAccountStore from "@/zustandStorage/accounts";

interface SignInProps {
  setHaveAccount: (value: boolean) => void;
}

export default function SignIn({ setHaveAccount }: SignInProps) {
  const { palette } = useTheme();
  const [email, setEmail] = useState<string>("");
  const accounts = useAccountStore((state: any) => state.accounts);

  const SignupSchema = Yup.object().shape({
    password: Yup.string().min(8, "حدال 8 کاراکتر").required("اجباری"),
    email: Yup.string().email("ایمیل نادرست است").required("اجباری"),
  });

  return (
    <Box
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { md: 400, xs: 300 },
        bgcolor: "background.paper",
        boxShadow: 24,
        py: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        px: 5,
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: "100%",
          bgcolor: palette.primary.main,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PeopleOutlineRoundedIcon sx={{ fontSize: "50px" }} />
      </Box>
      <Typography variant="h5" mt={1} mb={2} color={palette.primary.main}>
        ورود به پنل
      </Typography>
      <Formik
        initialValues={{ email: email, password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          accounts.some((e: any) => {
            if (e.email === values.email) {
              localStorage.setItem("token", e.id);
              window.location.reload();
            }
          });
          if (
            accounts.some((e: any) => {
              return e.email === values.email;
            }) === false
          ) {
            alert("This Account does`t exist");
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Field
                type="email"
                name="email"
                placeholder="ایمیل"
                as={OutlinedInput}
                color="primary"
                sx={{
                  bgcolor: palette.neutral[100],
                  mb: 3,
                  width: "100%",
                }}
              />

              <ErrorMessage
                name="email"
                component="div"
                className="formik-error"
              />
            </Box>
            <Box sx={{ position: "relative" }}>
              <Field
                type="password"
                name="password"
                placeholder="پسورد"
                as={OutlinedInput}
                color="primary"
                sx={{
                  bgcolor: palette.neutral[100],
                  mt: 0.8,
                  mb: 3,
                  width: "100%",
                }}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="formik-error"
              />
            </Box>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              sx={{ mt: 2, position: "relative" }}
            >
              <Typography variant="h6">ورود</Typography>
            </Button>
          </Form>
        )}
      </Formik>
      <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
        <Typography variant="button">اکانتی ندارید؟ </Typography>
        <Typography
          component="a"
          variant="button"
          sx={{
            color: palette.primary.main,
            mr: 1,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => {
            setHaveAccount(false);
          }}
        >
          ثبت نام
        </Typography>
      </Box>
    </Box>
  );
}
