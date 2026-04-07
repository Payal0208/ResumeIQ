import api from "../utils/api";

// 🔐 LOGIN
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

// 📝 SIGNUP
export const signupUser = (data) => {
  return api.post("/auth/signup", data);
};