import { createTheme } from "@mui/material";

import { lightPalette } from "./palette";
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
