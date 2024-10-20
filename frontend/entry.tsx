import React from "react";
import { createRoot } from "react-dom/client";

console.log("hi");

function App() {
  const hello: string = "hi";
  return <div>{hello}</div>;
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
