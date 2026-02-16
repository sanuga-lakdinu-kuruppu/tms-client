import apiClient from "../axiosConfig";

export default {
  createTask: async (data) => {
    return await apiClient.post(`/v1/tasks`, data);
  },
  createTasksBatch: async (data) => {
    return await apiClient.post(`/v1/tasks/batch`, data);
  },
  getTasks: async (url) => {
    return await apiClient.get(url);
  },
  updateTask: async (taskId, data) => {
    return await apiClient.put(`/v1/tasks/${taskId}`, data);
  },
  deleteTask: async (taskId) => {
    return await apiClient.delete(`/v1/tasks/${taskId}`);
  },
};
