import { TextField, Typography } from "@mui/material";
import React from "react";

function FieldText({
  label,
  value,
  onChange,
  error,
  clearError,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: string;
  clearError: () => void;
}) {
  return (
    <>
      <TextField
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          clearError();
        }}
        label={label}
        error={!!error}
      />
      {error ? (
        <Typography variant="subtitle2" color="red">
          {error}
        </Typography>
      ) : null}
    </>
  );
}

export default FieldText;
