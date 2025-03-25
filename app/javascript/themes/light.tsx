import { createTheme } from "@mui/material";

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
      letterSpacing: "0.05em",
      color: "#212121",
    },
    h6: {
      fontSize: "0.9rem",
      fontWeight: 600,
      color: "#37474F",
    },
  },
});

export default lightTheme;
