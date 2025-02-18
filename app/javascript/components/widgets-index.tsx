import React, { useEffect, useState } from "react";
import {
  Button,
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
import WidgetNew from "./widget-new";

function WidgetsIndex() {
  const navigate = useNavigate();

  const [widgets, setWidgets] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: getAllWidgetsData,
    isLoading: getAllWidgetsLoading,
    isError: getAllWidgetsError,
  }: {
    data: { widgets: Widget[] };
    isLoading: boolean;
    isError: boolean;
  } = useGetAllWidgets();

  useEffect(() => {
    if (!getAllWidgetsData) {
      return;
    }
    const { widgets } = getAllWidgetsData;
    setWidgets(widgets);
  }, [getAllWidgetsData]);

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
        <WidgetNew
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onCreate={(widgets: Widget[]) => {
            setWidgets(widgets);
            setDialogOpen(false);
          }}
        />
      </Stack>
    </>
  );
}

export default WidgetsIndex;
