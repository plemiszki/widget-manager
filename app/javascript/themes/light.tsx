import { createTheme } from "@mui/material";
import baseTheme from "./base";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    error: React.CSSProperties;
    bold: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    error?: React.CSSProperties;
    bold?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    error: true;
    bold: true;
  }
}

const lightTheme = createTheme(baseTheme, {
  palette: {
    background: {
      default: "#F5F6F7",
      paper: "#ffffff",
    },
    text: {
      primary: "#37474F",
      secondary: "#37474F",
    },
  },
  typography: {
    h1: {
      color: "#212121",
    },
    h6: {
      color: "black",
    },
    error: {
      color: "#D32F2F",
    },
  },
});

export default lightTheme;
