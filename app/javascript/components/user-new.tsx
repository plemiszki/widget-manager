import React, { useEffect, useState } from "react";
import { Button, Link, Paper, Stack, Typography } from "@mui/material";
import FieldText from "./library/field-text";
import { UserErrors } from "../types";
import useCreateUser from "../api/createUser";
import CenteredSpinnerPageBlocker from "./library/centered-spinner-page-blocker";
import ErrorBanner from "./library/error-banner";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function UserNew() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<UserErrors>({});

  const navigate = useNavigate();

  const clearError = (key: string) => {
    delete errors[key];
    setErrors(errors);
  };

  const { mutateAsync, data, isPending, isError } = useCreateUser();

  useEffect(() => {
    if (!data) {
      return;
    }
    const { user, errors } = data;
    if (errors) {
      setErrors(errors);
    } else {
      window.location.href = "/widgets";
    }
  }, [data]);

  return (
    <Stack
      sx={{ p: 2 }}
      spacing={2}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexGrow="1"
    >
      {isPending ? <CenteredSpinnerPageBlocker /> : null}
      {isError ? (
        <ErrorBanner text="There was an error creating the user." />
      ) : null}
      <Paper sx={{ p: 2, maxWidth: 750, width: "100%" }}>
        <Stack spacing={2}>
          <Typography variant="h1">Sign up</Typography>
          <Stack spacing={1}>
            <FieldText
              label="Email Address"
              value={email}
              onChange={(value: string) => setEmail(value)}
              errors={errors?.emailAddress}
              clearError={() => clearError("emailAddress")}
            />
            <FieldText
              label="Password"
              value={password}
              onChange={(value: string) => setPassword(value)}
              errors={errors?.password}
              clearError={() => clearError("password")}
              password
            />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              color="primary"
              variant="contained"
              onClick={() => mutateAsync({ email, password })}
              sx={{
                textTransform: "none",
              }}
            >
              Sign up
            </Button>
            <Link
              component={RouterLink}
              to="/session/new"
              underline="none"
              sx={{
                color: "text.secondary",
                textDecoration: "underline",
                textDecorationColor: "text.secondary",
              }}
            >
              <Typography variant="subtitle2">
                Already have an account?
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default UserNew;
