import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ pt: 4 }}
    >
      <Paper sx={{ p: 2, width: "100%", maxWidth: 500 }}>
        <Stack spacing={2} display="flex" alignItems="center">
          <QuestionMarkIcon sx={{ fontSize: 50 }} />
          <Typography variant="h1">Page Not Found</Typography>
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
      </Paper>
    </Box>
  );
}

export default NotFound;
