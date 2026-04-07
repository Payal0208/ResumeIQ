import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🔥 handle token expiry / unauthorized
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;