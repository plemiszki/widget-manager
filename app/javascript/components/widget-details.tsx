import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import CenteredSpinner from "./centered-spinner";
import { Widget } from "../types";
import useGetWidgetDetails from "../api/getWidgetDetails";
import { useParams } from "react-router-dom";
import ErrorBanner from "./error-banner";

function WidgetDetails() {
  const { id } = useParams();

  const {
    data: { widget } = {
      widget: null,
    },
    isLoading,
    isError,
  }: {
    data: { widget?: Widget };
    isLoading: boolean;
    isError: boolean;
  } = useGetWidgetDetails(id);

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (isError) {
    return <ErrorBanner text="There was an error loading the widget." />;
  }

  const { name, age } = widget;

  return (
    <>
      <Stack sx={{ p: 2 }} spacing={2}>
        <Typography>Widget Details</Typography>
        <Paper sx={{ width: "100%", p: 2 }}>
          <Typography>name: {name}</Typography>
          <Typography>age: {age}</Typography>
        </Paper>
      </Stack>
    </>
  );
}

export default WidgetDetails;
