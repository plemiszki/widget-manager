import React, { useState } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import FieldText from "./library/field-text";
import { UserErrors } from "../types";

function UserNew() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<UserErrors>({});

  const clearError = (key: string) => {
    delete errors[key];
    setErrors(errors);
  };

  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <Typography>Sign Up</Typography>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={1}>
          <FieldText
            label="Email Address"
            value={email}
            onChange={(value: string) => setEmail(value)}
            error={errors?.email}
            clearError={() => clearError("email")}
          />
          <FieldText
            label="Password"
            value={password}
            onChange={(value: string) => setPassword(value)}
            error={errors?.email}
            clearError={() => clearError("password")}
          />
        </Stack>
      </Paper>
      <Stack direction="row">
        <Button
          color="primary"
          variant="contained"
          onClick={() => console.log("sign up")}
        >
          Create Account
        </Button>
      </Stack>
    </Stack>
  );
}

export default UserNew;
