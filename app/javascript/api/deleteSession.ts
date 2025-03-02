import { useMutation } from "@tanstack/react-query";
import deleteApiData from "./deleteApiData";

const DELETE_SESSION_URL = `session`;

const deleteSession = async (
  onSuccess: (response: Response) => void
): Promise<any> => {
  try {
    const response: any = await deleteApiData({
      fullUrl: DELETE_SESSION_URL,
      onSuccess,
    });
    return response;
  } catch (e: unknown) {
    throw e;
  }
};

const useDeleteSession = (onSuccess: (response: Response) => void) => {
  const mutation = useMutation({
    mutationFn: () => deleteSession(onSuccess),
    mutationKey: [DELETE_SESSION_URL],
  });

  return mutation;
};

export default useDeleteSession;
