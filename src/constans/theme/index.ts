import { createTheme } from "@mui/material";

import { darkPalette, lightPalette } from "./palette";
import { typography } from "./typography";

export const lightTheme = createTheme({
  palette: lightPalette,
  typography,
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          padding: "8px 16px !important",
          ":focus": { outline: "none" },
        },
      },
    },
  },
});
export const darkTheme = createTheme({
  palette: darkPalette,
  typography,
});
