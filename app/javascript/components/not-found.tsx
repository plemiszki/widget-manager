import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <Typography>Not Found</Typography>
      <Stack direction="row">
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate("/widgets")}
        >
          Home
        </Button>
      </Stack>
    </Stack>
  );
}

export default NotFound;
