const postApiData = async <T>(
  url: string,
  { body, onSuccess }: { body?: any; onSuccess?: (response: Response) => void }
): Promise<T> => {
  const response = await fetch(`/api/${url}`, {
    method: "POST",
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

export default postApiData;
