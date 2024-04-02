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
import useAccountStore from "../../../zustandStorage/accounts";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useState } from "react";
import toast from "react-hot-toast";

interface SignUpProps {
  setHaveAccount: (value: boolean) => void;
}

export default function SignUp({ setHaveAccount }: SignUpProps) {
  const { palette } = useTheme();
  const addAccount = useAccountStore((state: any) => state.addaccount);
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
        ایجاد حساب
      </Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (
            accounts.some((e: any) => {
              return e.email === values.email;
            }) === true
          ) {
            toast.error("اکانتی با این مشخصات وجود دارد");
          } else {
            addAccount({
              email: values.email,
              password: values.password,
              id: crypto.randomUUID(),
            });
            toast.success("با موفقیت انجام شد");
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
              <Typography variant="h6">ثبت نام</Typography>
            </Button>
          </Form>
        )}
      </Formik>
      <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
        <Typography variant="button">هم اکنون اکانت دارید؟ </Typography>
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
            setHaveAccount(true);
          }}
        >
          ورود
        </Typography>
      </Box>
    </Box>
  );
}
