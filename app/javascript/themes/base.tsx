import { createTheme } from "@mui/material";

const baseTheme = createTheme({
  typography: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "0.9rem",
      fontWeight: 600,
    },
    bold: {
      fontWeight: 700,
    },
    error: {
      fontSize: 14,
      fontWeight: 500,
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
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: "none",
        },
      },
    },
  },
});

export default baseTheme;
