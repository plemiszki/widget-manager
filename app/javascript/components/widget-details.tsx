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
import { useNavigate, useParams } from "react-router-dom";
import ErrorBanner from "./error-banner";
import CenteredSpinnerPageBlocker from "./centered-spinner-page-blocker";
import useDeleteWidget from "../api/deleteWidget";

function WidgetDetails() {
  const navigate = useNavigate();
  const { id: idString } = useParams();
  const id = parseInt(idString);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const onDeleteSuccess = () => {
    navigate("/widgets");
  };

  const {
    data: { widget } = {
      widget: null,
    },
    isLoading: isLoadingGet,
    isError,
  }: {
    data: { widget?: Widget };
    isLoading: boolean;
    isError: boolean;
  } = useGetWidgetDetails(id);

  const {
    mutateAsync: mutateAsyncDelete,
    isPending: isPendingDelete,
    isError: isErrorDelete,
  } = useDeleteWidget(id, onDeleteSuccess);

  if (isLoadingGet) {
    return <CenteredSpinner />;
  }

  if (isError) {
    return <ErrorBanner text="There was an error loading the widget." />;
  }

  const { name, age } = widget;

  return (
    <>
      {isPendingDelete ? <CenteredSpinnerPageBlocker /> : null}
      <Stack sx={{ p: 2 }} spacing={2}>
        {isErrorDelete ? (
          <ErrorBanner text="There was an error deleting the widget." />
        ) : null}
        <Typography>Widget Details</Typography>
        <Paper sx={{ p: 2 }}>
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
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                setDeleteModalOpen(false);
                mutateAsyncDelete(id);
              }}
            >
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
