import { useMutation } from "@tanstack/react-query";
import { Widget } from "../types";
import putApiData from "./putApiData";

const UPDATE_WIDGET_URL = (id: number) => `widgets/${id}`;

interface ApiResponse {
  errors?: {
    name: string[];
    age: string[];
  };
  widget: Widget;
}

const updateWidget = async (widget: Widget): Promise<ApiResponse> => {
  try {
    const { id, name, age } = widget;
    const response: ApiResponse = await putApiData(UPDATE_WIDGET_URL(id), {
      body: {
        widget: {
          name,
          age,
        },
      },
    });
    return response;
  } catch (e: unknown) {
    throw e;
  }
};

const useUpdateWidget = (id: number) => {
  const mutation = useMutation({
    mutationFn: (widget: Widget) => updateWidget(widget),
    mutationKey: [UPDATE_WIDGET_URL(id)],
  });

  return mutation;
};

export default useUpdateWidget;
