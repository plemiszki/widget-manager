import React, { useEffect, useState } from "react";
import { Button, Link, Paper, Stack, Typography } from "@mui/material";
import FieldText from "./library/field-text";
import { LoginErrors } from "../types";
import CenteredSpinnerPageBlocker from "./library/centered-spinner-page-blocker";
import ErrorBanner from "./library/error-banner";
import useCreateSession from "../api/createSession";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const clearError = (key: string) => {
    delete errors[key];
    setErrors(errors);
  };

  const { mutateAsync, data, isPending, isError } = useCreateSession();

  useEffect(() => {
    if (!data) {
      return;
    }
    const { errors, redirectToUrl } = data;
    if (errors) {
      setErrors(errors);
    } else {
      navigate(redirectToUrl);
    }
  }, [data]);

  return (
    <Stack
      sx={{ p: 2 }}
      width="100%"
      spacing={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexGrow="1"
    >
      {isPending ? <CenteredSpinnerPageBlocker /> : null}
      <Paper sx={{ p: 2, maxWidth: 750, width: "100%" }}>
        <Stack spacing={2}>
          <Typography variant="h1">Sign in</Typography>
          {errors?.credentials ? (
            <ErrorBanner text="Your username and password are incorrect. Please try again." />
          ) : null}
          {isError ? (
            <ErrorBanner text="There was an error signing in." />
          ) : null}
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
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                mutateAsync({ email, password });
              }}
              sx={{
                textTransform: "none",
              }}
            >
              <Typography variant="bold">Sign in</Typography>
            </Button>
            <Link
              component={RouterLink}
              to="/users/new"
              underline="none"
              sx={{
                color: "text.secondary",
                textDecoration: "underline",
                textDecorationColor: "text.secondary",
              }}
            >
              <Typography variant="subtitle2">Need to sign up?</Typography>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default SignIn;
