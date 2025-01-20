import React from "react";
import { Box, CircularProgress } from "@mui/material";

function CenteredSpinner() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <CircularProgress size={75} />
    </Box>
  );
}

export default CenteredSpinner;
