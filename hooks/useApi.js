import { useState, useCallback } from "react";
import { api } from "@/utils/api";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (method, endpoint, data = null, options = {}) => {
      try {
        setLoading(true);
        setError(null);

        const response = await api[method](endpoint, data, options);
        return response;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    get: (endpoint, options) => request("get", endpoint, null, options),
    post: (endpoint, data, options) => request("post", endpoint, data, options),
    put: (endpoint, data, options) => request("put", endpoint, data, options),
    delete: (endpoint, options) => request("delete", endpoint, null, options),
  };
}
