import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return <div>the app!</div>;
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
