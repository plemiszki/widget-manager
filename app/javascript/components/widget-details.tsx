import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CenteredSpinner from "./centered-spinner";
import { Widget } from "../types";
import useGetWidgetDetails from "../api/getWidgetDetails";
import { useParams } from "react-router-dom";
import ErrorBanner from "./error-banner";
import CenteredSpinnerPageBlocker from "./centered-spinner-page-blocker";

function WidgetDetails() {
  const { id } = useParams();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const {
    data: { widget } = {
      widget: null,
    },
    isLoading,
    isError,
  }: {
    data: { widget?: Widget };
    isLoading: boolean;
    isError: boolean;
  } = useGetWidgetDetails(id);

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (isError) {
    return <ErrorBanner text="There was an error loading the widget." />;
  }

  const { name, age } = widget;

  return (
    <>
      {false ? <CenteredSpinnerPageBlocker /> : null}
      <Stack sx={{ p: 2 }} spacing={2}>
        <Typography>Widget Details</Typography>
        <Paper sx={{ width: "100%", p: 2 }}>
          <Typography>name: {name}</Typography>
          <Typography>age: {age}</Typography>
        </Paper>
        <Stack direction="row" spacing={2}>
          <Button color="primary" variant="contained">
            Save
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </Stack>
        <Dialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        >
          <DialogTitle>Do you really want to delete this widget?</DialogTitle>
          <DialogContent>
            <DialogContentText>This action cannot be undone.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" variant="contained">
              Yes
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setDeleteModalOpen(false)}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
}

export default WidgetDetails;
