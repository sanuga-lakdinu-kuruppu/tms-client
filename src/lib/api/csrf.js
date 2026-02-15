import apiClient from "./axiosConfig";

let csrfToken = null;

export const fetchCsrfToken = async () => {
  if (csrfToken) return csrfToken;

  const res = await apiClient.get("/v1/csrf-token");
  csrfToken = res.data.csrfToken;
  return csrfToken;
};

export const resetCsrfToken = () => {
  csrfToken = null;
};
