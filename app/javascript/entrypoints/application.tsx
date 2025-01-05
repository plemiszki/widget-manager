import React from "react";
import { createRoot } from "react-dom/client";

const x: number = 2;

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<p>{x}</p>);
