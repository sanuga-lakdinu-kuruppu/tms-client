import apiClient from "../axiosConfig";

export default {
  register: async (data) => {
    const response = await apiClient.post("/v1/auth/register", data);
    return response;
  },

  login: async ({ email, password }) => {
    const request = {
      email,
      password,
    };
    const response = await apiClient.post("/v1/auth/login", request);
    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.data.accessToken}`;
    }
    return response;
  },

  logout: async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("profile");
    delete apiClient.defaults.headers.common["Authorization"];
    return { success: true };
  },

  refreshToken: async (refreshToken) => {
    const response = await apiClient.post("/v1/auth/refresh", { refreshToken });
    if (response.data.data.accessToken && response.data.data.refreshToken) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.data.accessToken}`;
    }
    return response;
  },
};
