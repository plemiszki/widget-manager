import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    error: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    error?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    error: true;
  }
}

const lightTheme = createTheme({
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
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#212121",
      letterSpacing: "0.05em",
    },
    h6: {
      fontSize: "0.9rem",
      fontWeight: 600,
      color: "#37474F",
    },
    error: {
      fontSize: 14,
      fontWeight: 500,
      color: "#D32F2F",
    },
  },
});

export default lightTheme;
