import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#121212",
      paper: "#2c2c2c",
    },
    text: {
      primary: "#e0e0e0",
      secondary: "#bdbdbd",
    },
  },
  typography: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "0.05em",
      color: "#e0e0e0",
    },
    h6: {
      fontSize: "0.9rem",
      fontWeight: 600,
      color: "#e0e0e0",
    },
    error: {
      fontSize: 14,
      fontWeight: 500,
      color: "#ff6b6b",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#424242",
          },
          "& .Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ff6b6b !important",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardError: {
          backgroundColor: "#2a1b1b",
          color: "#ff6b6b",
        },
      },
    },
  },
});

export default darkTheme;
