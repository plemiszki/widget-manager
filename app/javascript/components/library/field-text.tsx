import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

function FieldText({
  label,
  value,
  onChange,
  errors,
  clearError,
  password,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
  clearError: () => void;
  password?: boolean;
}) {
  const errorToDisplay = errors && errors.length > 0 ? errors[0] : null;
  return (
    <Stack spacing={0.5}>
      <Typography variant="h6" color="black">
        {label}
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          clearError();
        }}
        error={!!errorToDisplay}
        type={password ? "password" : null}
      />
      {errorToDisplay ? (
        <Typography variant="error">{errorToDisplay}</Typography>
      ) : null}
    </Stack>
  );
}

export default FieldText;
