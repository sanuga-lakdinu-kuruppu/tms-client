import apiClient from "./axiosConfig";
import auth from "./endpoints/auth";

const api = {
  auth,
  setAuthToken: (token) => {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", token);
      }
    } else {
      delete apiClient.defaults.headers.common["Authorization"];
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    }
  },
};

export default api;
