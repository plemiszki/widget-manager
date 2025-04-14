import { createTheme } from "@mui/material";
import baseTheme from "./base";

const darkTheme = createTheme(baseTheme, {
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
      color: "#e0e0e0",
    },
    h6: {
      color: "#e0e0e0",
    },
    error: {
      color: "#ff6b6b",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            backgroundColor: "#424242",
            color: "black",
          },
        },
      },
    },
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
    MuiTableRow: {
      styleOverrides: {
        root: {
          th: {
            borderBottom: "solid 1px black",
          },
          td: {
            borderBottom: "solid 1px black",
          },
          "&.MuiTableRow-hover:hover": {
            backgroundColor: "#444444",
          },
        },
      },
    },
  },
});

export default darkTheme;
