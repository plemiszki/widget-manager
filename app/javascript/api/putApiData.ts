const putApiData = async <T>(
  url: string,
  { body, onSuccess }: { body?: any; onSuccess?: (response: Response) => void }
): Promise<T> => {
  const response = await fetch(`/api/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    onSuccess?.(response);
  }
  return await response.json();
};

export default putApiData;
