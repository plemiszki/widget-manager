import { createTheme } from "@mui/material";

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
    },
    h6: {
      fontSize: "0.9rem",
      fontWeight: 600,
      color: "#37474F",
    },
    bold: {
      fontWeight: 700,
    },
    error: {
      fontSize: 14,
      fontWeight: 500,
      color: "#D32F2F",
    },
  },
  components: {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 20,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "#212121",
        },
      },
    },
  },
});

export default lightTheme;
