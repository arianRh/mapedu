import {
  TypographyOptions,
  TypographyStyleOptions,
} from "@mui/material/styles/createTypography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    label: TypographyStyleOptions;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    label?: TypographyStyleOptions;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    label: true;
  }
}

export const typography: TypographyOptions = {
  fontFamily:
    "b koodak,Arial,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
  h1: {
    fontWeight: 500,
    fontSize: "2.5rem",
    lineHeight: "4rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 500,
      fontSize: "1.87rem",
      lineHeight: "2.81rem",
      letterSpacing: 0,
    },
  },
  h2: {
    fontWeight: 500,
    fontSize: "2.25rem",
    lineHeight: "3.6rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 500,
      fontSize: "1.75rem",
      lineHeight: "2.62rem",
      letterSpacing: 0,
    },
  },
  h3: {
    fontWeight: 400,
    fontSize: "2rem",
    lineHeight: "3.2rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "1.62rem",
      lineHeight: "2.43rem",
      letterSpacing: 0,
    },
  },
  h4: {
    fontWeight: 400,
    fontSize: "1.75rem",
    lineHeight: "2.8rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: "2.25rem",
      letterSpacing: 0,
    },
  },
  h5: {
    fontWeight: 400,
    fontSize: "1.5rem",
    lineHeight: "2.4rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "1.37rem",
      lineHeight: "2.06rem",
      letterSpacing: 0,
    },
  },
  h6: {
    fontWeight: 500,
    fontSize: "1.25rem",
    lineHeight: "2rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: "1.87rem",
      letterSpacing: 0,
    },
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: "1.125rem",
    lineHeight: "1.8rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "1.25rem",
      lineHeight: "1.87rem",
      letterSpacing: 0,
    },
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: "1.4rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: "1.37rem",
      letterSpacing: 0,
    },
  },
  body1: {
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: "1.6rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "1.115rem",
      lineHeight: "1.68rem",
      letterSpacing: 0,
    },
  },
  body2: {
    fontWeight: 400,
    fontSize: "0.875rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "1rem",
      letterSpacing: 0,
    },
  },
  button: {
    fontWeight: 500,
    fontSize: "0.875rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 500,
      fontSize: "1rem",
      letterSpacing: 0,
    },
    textTransform: "none",
  },
  caption: {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "1.2rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "0.87rem",
      lineHeight: "1.4rem",
      letterSpacing: 0,
    },
  },
  overline: {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "1.2rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "0.87rem",
      lineHeight: "1.4rem",
      letterSpacing: 0,
    },
    textTransform: "none",
  },
  label: {
    fontWeight: 400,
    fontSize: "0.75rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 500,
      fontSize: "0.75rem",
      letterSpacing: 0,
    },
  },
};
