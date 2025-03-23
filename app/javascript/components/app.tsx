import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WidgetsIndex from "./widgets-index";
import SignIn from "./sign-in";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserNew from "./user-new";
import WidgetDetails from "./widget-details";
import NotFound from "./not-found";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
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
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#424242",
          },
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <WidgetsIndex />,
  },
  {
    path: "/session/new",
    element: <SignIn />,
  },
  {
    path: "/users/new",
    element: <UserNew />,
  },
  {
    path: "/widgets",
    element: <WidgetsIndex />,
  },
  {
    path: "/widgets/:id",
    element: <WidgetDetails />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
