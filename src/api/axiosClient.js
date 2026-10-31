import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authentication headers
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("student_token") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Normalize errors in one place
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Student API error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Network error: Student API is unreachable.");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
