import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CenteredSpinner from "./library/centered-spinner";
import { Widget, WidgetErrors } from "../types";
import useGetWidgetDetails from "../api/getWidgetDetails";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBanner from "./library/error-banner";
import CenteredSpinnerPageBlocker from "./library/centered-spinner-page-blocker";
import useDeleteWidget from "../api/deleteWidget";
import useUpdateWidget from "../api/updateWidget";
import FieldText from "./library/field-text";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function WidgetDetails() {
  const navigate = useNavigate();
  const { id: idString } = useParams();
  const id = parseInt(idString);

  const [errors, setErrors] = useState<WidgetErrors>({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [widgetSaved, setWidgetSaved] = useState({
    name: "",
    age: "",
  });
  const [justSaved, setJustSaved] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const clearError = (key: string) => {
    delete errors[key];
    setErrors(errors);
  };

  const {
    data: getResponse,
    isLoading: initialLoadPending,
    isError: initialLoadError,
  }: {
    data: { widget?: Widget };
    isLoading: boolean;
    isError: boolean;
  } = useGetWidgetDetails(id);

  const {
    mutateAsync: mutateAsyncUpdate,
    data: updateResponse,
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
    if (!getResponse) {
      return;
    }
    const { widget } = getResponse;
    setWidgetSaved(widget);
    const { name, age } = widget;
    setName(name);
    setAge(String(age));
  }, [getResponse]);

  useEffect(() => {
    if (!updateResponse) {
      return;
    }
    const { errors, widget } = updateResponse;
    if (errors) {
      setErrors(errors);
    } else {
      setWidgetSaved(widget);
      setJustSaved(true);
      setHasChanges(false);
    }
  }, [updateResponse]);

  useEffect(() => {
    setJustSaved(false);
    const { name: nameSaved, age: ageSaved } = widgetSaved;
    if (name !== nameSaved || age !== String(ageSaved)) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [name, age]);

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
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton onClick={() => navigate("/widgets")}>
            <ArrowBackIcon />
          </IconButton>
          <Typography>Widget Details</Typography>
        </Stack>
        <Paper sx={{ p: 2 }}>
          <Stack spacing={1}>
            <FieldText
              label="Name"
              value={name}
              onChange={(value: string) => setName(value)}
              errors={errors?.name}
              clearError={() => clearError("name")}
            />
            <FieldText
              label="Age"
              value={age}
              onChange={(value: string) => setAge(value)}
              errors={errors?.age}
              clearError={() => clearError("age")}
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
            disabled={!hasChanges}
          >
            {hasChanges ? "Save" : justSaved ? "Saved" : "No Changes"}
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
