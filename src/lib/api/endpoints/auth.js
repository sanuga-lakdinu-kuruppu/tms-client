import apiClient from "../axiosConfig";

export default {
  register: async (data) => {
    const response = await apiClient.post("/v1/auth/register", data);
    return response;
  },

  login: async ({ email, password }) => {
    const request = { email, password };
    const response = await apiClient.post("/v1/auth/login", request);
    return response;
  },

  logout: async () => {
    return { success: true };
  },

  refreshToken: async () => {
    const response = await apiClient.post("/v1/auth/refresh");
    return response;
  },
};
