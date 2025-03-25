import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WidgetsIndex from "./widgets-index";
import SignIn from "./sign-in";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserNew from "./user-new";
import WidgetDetails from "./widget-details";
import NotFound from "./not-found";
import { CssBaseline, ThemeProvider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import darkTheme from "../themes/dark";
import lightTheme from "../themes/light";

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
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
