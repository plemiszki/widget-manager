import React from "react";
import { Box, CircularProgress } from "@mui/material";

function CenteredSpinnerPageBlocker() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "fixed",
        background: "rgba(0,0,0,0.1)",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <CircularProgress size={75} />
    </Box>
  );
}

export default CenteredSpinnerPageBlocker;
