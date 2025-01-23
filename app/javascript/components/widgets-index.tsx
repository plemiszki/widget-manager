import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CenteredSpinner from "./library/centered-spinner";
import useGetAllWidgets from "../api/getAllWidgets";
import type { Widget, WidgetErrors } from "../types";
import ErrorBanner from "./library/error-banner";
import FieldText from "./library/field-text";
import useCreateWidget from "../api/createWidget";

function WidgetsIndex() {
  const navigate = useNavigate();

  const [widgets, setWidgets] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState<WidgetErrors>({});

  const clearError = (key: string) => {
    delete errors[key];
    setErrors(errors);
  };

  const {
    data: getAllWidgetsData,
    isLoading: getAllWidgetsLoading,
    isError: getAllWidgetsError,
  }: {
    data: { widgets: Widget[] };
    isLoading: boolean;
    isError: boolean;
  } = useGetAllWidgets();

  const {
    mutateAsync: mutateAsyncCreate,
    data: createWidgetData,
    isPending: createWidgetPending,
    isError: createWidgetError,
  } = useCreateWidget();

  useEffect(() => {
    if (!getAllWidgetsData) {
      return;
    }
    const { widgets } = getAllWidgetsData;
    setWidgets(widgets);
  }, [getAllWidgetsData]);

  useEffect(() => {
    if (!createWidgetData) {
      return;
    }
    const { widgets, errors } = createWidgetData;
    if (errors) {
      setErrors(errors);
    } else {
      setDialogOpen(false);
      setWidgets(widgets);
      setName("");
      setAge("");
    }
  }, [createWidgetData]);

  if (getAllWidgetsLoading) {
    return <CenteredSpinner />;
  }

  if (getAllWidgetsError) {
    return <ErrorBanner text="There was an error loading the widgets." />;
  }

  return (
    <>
      <Stack sx={{ m: 2 }} spacing={2}>
        <Stack direction="row" display="flext" justifyContent="space-between">
          <Typography>Widgets</Typography>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Add Widget
          </Button>
        </Stack>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {widgets.map(({ id, name, age }: Widget) => {
                return (
                  <TableRow
                    key={`row-${id}`}
                    onClick={() => navigate(`/widgets/${id}`)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{name}</TableCell>
                    <TableCell>{age}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <Dialog
          fullWidth
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        >
          <DialogTitle>Add Widget</DialogTitle>
          <DialogContent>
            <Stack spacing={1}>
              <FieldText
                label="Name"
                value={name}
                onChange={(value: string) => setName(value)}
                error={errors?.name}
                clearError={() => clearError("name")}
              />
              <FieldText
                label="Age"
                value={age}
                onChange={(value: string) => setAge(value)}
                error={errors?.age}
                clearError={() => clearError("age")}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              onClick={() => mutateAsyncCreate({ name, age })}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
}

export default WidgetsIndex;
