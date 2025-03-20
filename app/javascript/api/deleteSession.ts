import { useMutation } from "@tanstack/react-query";
import deleteApiData from "./deleteApiData";

const DELETE_SESSION_URL = "session";

const deleteSession = async (onSuccess: () => void): Promise<any> => {
  try {
    const response = await deleteApiData(DELETE_SESSION_URL, onSuccess);
    return response;
  } catch (e: unknown) {
    throw e;
  }
};

const useDeleteSession = (onSuccess: () => void) => {
  const mutation = useMutation({
    mutationFn: () => deleteSession(onSuccess),
  });

  return mutation;
};

export default useDeleteSession;
