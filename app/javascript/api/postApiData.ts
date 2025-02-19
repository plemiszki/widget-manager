import { getCsrfToken } from "./getCsrfToken";

const postApiData = async <T>(
  url: string,
  { body, onSuccess }: { body?: any; onSuccess?: (response: Response) => void }
): Promise<T> => {
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = metaTag.getAttribute("content");
  const response = await fetch(`/api/${url}`, {
    method: "POST",
    headers: {
      "x-csrf-token": getCsrfToken(),
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
