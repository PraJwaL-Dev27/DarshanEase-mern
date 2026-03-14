import axios from "axios";

const api = axios.create({
  baseURL: "https://darshanease-api.onrender.com/api",
   headers: {
    "Cache-Control": "no-cache",
   },
});

// 🔐 Attach token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;