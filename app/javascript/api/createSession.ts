import { useMutation } from "@tanstack/react-query";
import { User } from "../types";
import postApiData from "./postApiData";

const CREATE_SESSION_URL = "session";

interface ApiResponse {
  redirect_to_url?: string;
  errors?: {
    credentials: boolean;
  };
}

interface ApiResponseFormatted {
  redirectToUrl?: string;
  errors?: {
    credentials: boolean;
  };
}

const createSession = async (user: User): Promise<ApiResponseFormatted> => {
  try {
    const { email, password } = user;
    const response: ApiResponse = await postApiData(CREATE_SESSION_URL, {
      body: {
        email_address: email,
        password,
      },
    });

    const { redirect_to_url: redirectToUrl, ...rest } = response;

    return {
      redirectToUrl,
      ...rest,
    };
  } catch (e: unknown) {
    throw e;
  }
};

const useCreateSession = () => {
  const mutation = useMutation({
    mutationFn: (user: User) => createSession(user),
    mutationKey: [CREATE_SESSION_URL],
  });

  return mutation;
};

export default useCreateSession;
