import apiClient from "./axiosConfig";
import auth from "./endpoints/auth";
import user from "./endpoints/user";
import task from "./endpoints/task";

const api = {
  auth,
  user,
  task,
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
