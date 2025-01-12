import React from "react";
import {
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
import CenteredSpinner from "./centered-spinner";
import useGetAllWidgets from "../api/getAllWidgets";
import type { Widget } from "../types";

function WidgetsIndex() {
  const navigate = useNavigate();

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

  return (
    <>
      <Stack sx={{ m: 2 }} spacing={2}>
        <Typography>Widgets</Typography>
        <Paper sx={{ width: "100%" }}>
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
      </Stack>
    </>
  );
}

export default WidgetsIndex;
