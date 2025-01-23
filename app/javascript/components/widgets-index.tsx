import React, { useState } from "react";
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
import type { Widget } from "../types";
import ErrorBanner from "./library/error-banner";
import FieldText from "./library/field-text";

function WidgetsIndex() {
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const {
    data: { widgets } = { widgets: [] },
    isLoading,
    isError,
  }: {
    data: { widgets: Widget[] };
    isLoading: boolean;
    isError: boolean;
  } = useGetAllWidgets();

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (isError) {
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
              />
              <FieldText
                label="Age"
                value={age}
                onChange={(value: string) => setAge(value)}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
}

export default WidgetsIndex;
