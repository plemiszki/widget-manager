import React, { useEffect, useState } from "react";
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
import CenteredSpinner from "./library/centered-spinner";
import { Widget } from "../types";
import useGetWidgetDetails from "../api/getWidgetDetails";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBanner from "./library/error-banner";
import CenteredSpinnerPageBlocker from "./library/centered-spinner-page-blocker";
import useDeleteWidget from "../api/deleteWidget";
import useUpdateWidget from "../api/updateWidget";
import FieldText from "./library/field-text";

function WidgetDetails() {
  const navigate = useNavigate();
  const { id: idString } = useParams();
  const id = parseInt(idString);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const {
    data: { widget: widgetSaved } = {
      widget: {
        id: null,
        name: "",
        age: "",
      },
    },
    isLoading: initialLoadPending,
    isError: initialLoadError,
  }: {
    data: { widget?: Widget };
    isLoading: boolean;
    isError: boolean;
  } = useGetWidgetDetails(id);

  const {
    mutateAsync: mutateAsyncUpdate,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
  } = useUpdateWidget(id);

  const {
    mutateAsync: mutateAsyncDelete,
    isPending: isPendingDelete,
    isError: isErrorDelete,
  } = useDeleteWidget(id, () => {
    navigate("/widgets");
  });

  useEffect(() => {
    const { name, age } = widgetSaved ?? {};
    setName(name);
    setAge(age);
  }, [widgetSaved]);

  if (initialLoadPending) {
    return <CenteredSpinner />;
  }

  if (initialLoadError) {
    return <ErrorBanner text="There was an error loading the widget." />;
  }

  const showPageBlocker = isPendingUpdate || isPendingDelete;

  return (
    <>
      {showPageBlocker ? <CenteredSpinnerPageBlocker /> : null}
      <Stack sx={{ p: 2 }} spacing={2}>
        {isErrorUpdate ? (
          <ErrorBanner text="There was an error updating the widget." />
        ) : null}
        {isErrorDelete ? (
          <ErrorBanner text="There was an error deleting the widget." />
        ) : null}
        <Typography>Widget Details</Typography>
        <Paper sx={{ p: 2 }}>
          <Stack spacing={1}>
            <FieldText
              label="Name"
              value={name}
              onChange={(value: string) => setName(value)}
            />
            <FieldText
              label="Age"
              value={age}
              onChange={(value: string) => setAge(value)}
            />
          </Stack>
        </Paper>
        <Stack direction="row" spacing={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              mutateAsyncUpdate({ id, name, age });
            }}
          >
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
