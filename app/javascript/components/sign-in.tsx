import React, { useEffect, useState } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import FieldText from "./library/field-text";
import { LoginErrors } from "../types";
import CenteredSpinnerPageBlocker from "./library/centered-spinner-page-blocker";
import ErrorBanner from "./library/error-banner";
import useCreateSession from "../api/createSession";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [spinner, setSpinner] = useState(false);

  const clearError = (key: string) => {
    delete errors[key];
    setErrors(errors);
  };

  const { mutateAsync, data, isError } = useCreateSession();

  useEffect(() => {
    if (!data) {
      return;
    }
    const { errors, redirectToUrl } = data;
    if (errors) {
      setErrors(errors);
      setSpinner(false);
    } else {
      window.location.href = redirectToUrl;
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setSpinner(false);
    }
  }, [isError]);

  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      {spinner ? <CenteredSpinnerPageBlocker /> : null}
      {isError ? <ErrorBanner text="There was an error signing in." /> : null}
      {errors?.credentials ? (
        <ErrorBanner text="Your username and password are incorrect. Please try again." />
      ) : null}
      <Typography>Sign In</Typography>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={1}>
          <FieldText
            label="Email Address"
            value={email}
            onChange={(value: string) => setEmail(value)}
            clearError={() => clearError("credentials")}
          />
          <FieldText
            label="Password"
            value={password}
            onChange={(value: string) => setPassword(value)}
            clearError={() => clearError("credentials")}
            password
          />
        </Stack>
      </Paper>
      <Stack direction="row">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setSpinner(true);
            mutateAsync({ email, password });
          }}
        >
          Sign In
        </Button>
      </Stack>
    </Stack>
  );
}

export default SignIn;
