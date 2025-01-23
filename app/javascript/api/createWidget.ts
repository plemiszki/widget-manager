import { useMutation } from "@tanstack/react-query";
import { Widget } from "../types";
import postApiData from "./postApiData";

const CREATE_WIDGET_URL = "widgets";

interface ApiResponse {
  errors?: {
    name: string;
    age: string;
  };
  widgets: Widget[];
}

const createWidget = async (widget: Widget): Promise<ApiResponse> => {
  try {
    const { name, age } = widget;
    const response: ApiResponse = await postApiData(CREATE_WIDGET_URL, {
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

const useCreateWidget = () => {
  const mutation = useMutation({
    mutationFn: (widget: Widget) => createWidget(widget),
    mutationKey: [CREATE_WIDGET_URL],
  });

  return mutation;
};

export default useCreateWidget;
