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

interface Widget {
  name: string;
}

const WIDGETS: Widget[] = [
  {
    name: "Widget 1",
  },
  {
    name: "Widget 2",
  },
];

function WidgetsIndex() {
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
              {WIDGETS.map(({ name }: Widget) => {
                return (
                  <TableRow>
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
