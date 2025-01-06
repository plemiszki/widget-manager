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

interface Widget {
  id: number;
  name: string;
}

const WIDGETS: Widget[] = [
  {
    id: 1,
    name: "Widget 1",
  },
  {
    id: 2,
    name: "Widget 2",
  },
];

function WidgetsIndex() {
  const navigate = useNavigate();
  const showSpinner = false;

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
