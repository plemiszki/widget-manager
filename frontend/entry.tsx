import React from "react";
import Button from "@mui/material/Button";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/moo",
    element: <div>moo</div>,
  },
]);

function App() {
  const hello: string = "heyooooo";
  const n: number = 2;
  return (
    <div>
      {hello} {n}
      <Link to={`moo`}>Moo Page</Link>
      <Button variant="contained">Hello world</Button>
    </div>
  );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<RouterProvider router={router} />);
