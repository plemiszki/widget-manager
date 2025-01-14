const deleteApiData = async <T>(
  url: string,
  onSuccess: (response: Response) => void
): Promise<T> => {
  const response = await fetch(`/api/${url}`, { method: "DELETE" });
  if (response.ok) {
    onSuccess(response);
  }
  return await response.json();
};

export default deleteApiData;
