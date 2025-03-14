import { useMutation } from "@tanstack/react-query";
import { User } from "../types";
import postApiData from "./postApiData";

const CREATE_USER_URL = "users";

interface ApiResponse {
  errors?: {
    email: string;
    password: string;
  };
  user: User;
}

const createUser = async (user: User): Promise<ApiResponse> => {
  try {
    const { email, password } = user;
    const response: ApiResponse = await postApiData(CREATE_USER_URL, {
      body: {
        user: {
          email_address: email,
          password,
        },
      },
    });
    return response;
  } catch (e: unknown) {
    throw e;
  }
};

const useCreateUser = () => {
  const mutation = useMutation({
    mutationFn: (user: User) => createUser(user),
    mutationKey: [CREATE_USER_URL],
  });

  return mutation;
};

export default useCreateUser;
