import { useQuery } from "@tanstack/react-query";
import getApiData from "./getApiData";
import { Widget } from "../types";

const GET_WIDGET_DETAILS_URL = (id: number) => `widgets/${id}`;

interface ApiResponse {
  widget: Widget;
}

const getWidgetDetails = async (id: number): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await getApiData(GET_WIDGET_DETAILS_URL(id));
    return response;
  } catch (e: unknown) {
    throw e;
  }
};

const useGetWidgetDetails = (id) => {
  const query = useQuery({
    queryKey: [GET_WIDGET_DETAILS_URL(id)],
    queryFn: () => getWidgetDetails(id),
  });

  return query;
};

export default useGetWidgetDetails;
