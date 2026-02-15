import apiClient from "../axiosConfig";

export default {
  getCurrentUser: () => apiClient.get("/v1/users/profile"),
};
