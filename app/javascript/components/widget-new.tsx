import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import type { Widget, WidgetErrors } from "../types";
import ErrorBanner from "./library/error-banner";
import FieldText from "./library/field-text";
import useCreateWidget from "../api/createWidget";

function WidgetNew({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (widgets: Widget[]) => void;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState<WidgetErrors>({});

  const clearError = (key: string) => {
    delete errors[key];
    setErrors(errors);
  };

  const {
    mutateAsync: mutateAsyncCreate,
    data: createWidgetData,
    isPending: createWidgetPending,
    isError: createWidgetError,
  } = useCreateWidget();

  useEffect(() => {
    if (!createWidgetData) {
      return;
    }
    const { widgets, errors } = createWidgetData;
    if (errors) {
      setErrors(errors);
    } else {
      onCreate(widgets);
      setName("");
      setAge("");
    }
  }, [createWidgetData]);

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      <DialogTitle>Add Widget</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          {createWidgetError ? (
            <ErrorBanner text="There was an error creating the widget." />
          ) : null}
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
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => mutateAsyncCreate({ name, age })}
          disabled={createWidgetPending}
        >
          Add Widget
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WidgetNew;
