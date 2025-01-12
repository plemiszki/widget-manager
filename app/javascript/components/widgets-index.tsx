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
import useGetWidgets from "../api/getWidgets";
import type { Widget } from "../types";

const WIDGETS: Widget[] = [
  {
    id: 1,
    name: "Widget 1",
    age: 10,
  },
  {
    id: 2,
    name: "Widget 2",
    age: 20,
  },
];

function WidgetsIndex() {
  const navigate = useNavigate();
  const showSpinner = false;

  const {
    data: widgets = [],
    isLoading,
    isError,
  }: {
    data: Widget[];
    isLoading: boolean;
    isError: boolean;
  } = useGetWidgets();

  console.log("widgets", widgets);

  if (showSpinner) {
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
              </TableRow>
            </TableHead>
            <TableBody>
              {WIDGETS.map(({ id, name }: Widget) => {
                return (
                  <TableRow
                    key={`row-${id}`}
                    onClick={() => navigate(`/widgets/${id}`)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{name}</TableCell>
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
