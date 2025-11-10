import axios from "axios";

// ✅ Use environment variable if exists (CRA style)
const baseURL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

// ✅ Create axios instance
const api = axios.create({ baseURL });

// ✅ Attach JWT token automatically before each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: Global error handler for unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized: token expired or invalid");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;
