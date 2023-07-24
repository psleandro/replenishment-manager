const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const baseUrl = `${apiUrl}/api`;

export const api = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${baseUrl}${input}`, {
    ...init,
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};
