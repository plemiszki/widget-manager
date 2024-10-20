import React from "react";
import { createRoot } from "react-dom/client";

console.log("hi");

function App() {
  const hello: string = "heyooooo";
  const n: number = 2;
  return (
    <div>
      {hello} {n}
    </div>
  );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
