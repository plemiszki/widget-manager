import { useMutation } from "@tanstack/react-query";
import { getCsrfToken } from "./getCsrfToken";

const signOut = async (onSuccess: () => void) => {
  const response = await fetch("/session", {
    method: "DELETE",
    headers: { "x-csrf-token": getCsrfToken() },
  });
  if (response.ok) {
    onSuccess();
  }
  window.location.replace("/widgets");
};

const deleteSession = async (onSuccess: () => void): Promise<any> => {
  try {
    const response: any = await signOut(onSuccess);
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
