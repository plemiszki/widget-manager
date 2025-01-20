import { Alert } from "@mui/material";
import React from "react";

function ErrorBanner({ text }: { text: string }) {
  return <Alert severity="error">{text}</Alert>;
}

export default ErrorBanner;
