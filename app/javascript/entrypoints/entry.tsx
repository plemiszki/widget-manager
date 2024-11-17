import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WidgetsIndex from "../components/widgets-index";
import WidgetDetails from "../components/widget-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WidgetsIndex />,
  },
  {
    path: "/widgets/:id",
    element: <WidgetDetails />,
  },
]);

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<RouterProvider router={router} />);
