import { Header } from "@/layout/Header";
import { AppProps } from "next/app";
import "../styles/global.css";
import { lightTheme } from "../constans/theme";
import { Container, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

type AppOwnProps = { example: string };

export default function MyApp({
  Component,
  pageProps,
}: AppProps & AppOwnProps) {
  const { push } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      push("/");
    } else {
      push("/login");
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Toaster position="top-right" reverseOrder={false} />

        <Container>
          <Header />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  );
}
