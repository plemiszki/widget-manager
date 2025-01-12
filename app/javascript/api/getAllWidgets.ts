import { useQuery } from "@tanstack/react-query";
import getApiData from "./getApiData";
import { Widget } from "../types";

const GET_ALL_WIDGETS_URL = "widgets";

interface ApiResponse {
  widgets: Widget[];
}

const getAllWidgets = async (): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await getApiData(GET_ALL_WIDGETS_URL);
    return response;
  } catch (e: unknown) {
    throw e;
  }
};

const useGetAllWidgets = () => {
  const query = useQuery({
    queryKey: [GET_ALL_WIDGETS_URL],
    queryFn: getAllWidgets,
  });

  return query;
};

export default useGetAllWidgets;
