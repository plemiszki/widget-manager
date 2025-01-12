const getApiData = async <T>(url: string): Promise<T> => {
  const response = await fetch(`api/${url}`);
  return await response.json();
};

export default getApiData;
