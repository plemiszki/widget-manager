import { useQuery } from "@tanstack/react-query";
import getApiData from "./getApiData";
import { Widget } from "../types";

const GET_ALL_WIDGETS_URL = "widgets";

const getAllWidgets = async (): Promise<Widget[]> => {
  try {
    const widgets: Widget[] = await getApiData(GET_ALL_WIDGETS_URL);
    return widgets;
  } catch (e: unknown) {
    throw e;
  }
};

const useGetWidgets = () => {
  const query = useQuery({
    queryKey: [GET_ALL_WIDGETS_URL],
    queryFn: getAllWidgets,
  });

  return query;
};

export default useGetWidgets;
