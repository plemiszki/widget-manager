import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WidgetsIndex from "../components/widgets-index";
import WidgetDetails from "../components/widget-details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    path: "/widgets",
    element: <WidgetsIndex />,
  },
  {
    path: "/widgets/:id",
    element: <WidgetDetails />,
  },
]);

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
