import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchApi(endpoint, options = {}) {
  const session = await getSession();

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(session?.accessToken && {
        Authorization: `Bearer ${session.accessToken}`,
      }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}

export const api = {
  get: (endpoint, options = {}) =>
    fetchApi(endpoint, { ...options, method: "GET" }),

  post: (endpoint, data, options = {}) =>
    fetchApi(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: (endpoint, data, options = {}) =>
    fetchApi(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (endpoint, options = {}) =>
    fetchApi(endpoint, { ...options, method: "DELETE" }),
};
