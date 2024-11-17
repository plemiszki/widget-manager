import React from "react";
import { Paper, Stack, Typography } from "@mui/material";

const WIDGET = {
  name: "Widget 1",
};

function WidgetDetails() {
  const { name } = WIDGET;
  return (
    <>
      <Stack sx={{ p: 2 }} spacing={2}>
        <Typography>Widget Details (Test)</Typography>
        <Paper sx={{ width: "100%", p: 2 }}>
          <Typography>{name}</Typography>
        </Paper>
      </Stack>
    </>
  );
}

export default WidgetDetails;
