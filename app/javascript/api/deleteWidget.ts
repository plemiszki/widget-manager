import { useMutation } from "@tanstack/react-query";
import { Widget } from "../types";
import deleteApiData from "./deleteApiData";

const DELETE_WIDGET_URL = (id: number) => `widgets/${id}`;

interface ApiResponse {
  widget: Widget;
}

const deleteWidget = async (
  id: number,
  onSuccess: (response: Response) => void
): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await deleteApiData(
      DELETE_WIDGET_URL(id),
      onSuccess
    );
    return response;
  } catch (e: unknown) {
    throw e;
  }
};

const useDeleteWidget = (
  id: number,
  onSuccess: (response: Response) => void
) => {
  const mutation = useMutation({
    mutationFn: (id: number) => deleteWidget(id, onSuccess),
    mutationKey: [DELETE_WIDGET_URL(id)],
  });

  return mutation;
};

export default useDeleteWidget;
