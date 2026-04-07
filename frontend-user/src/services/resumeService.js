import api from "../utils/api";

// 📄 UPLOAD RESUME
export const uploadResume = (formData) => {
  return api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 📊 GET RESUME ANALYSIS
export const getAnalysis = () => {
  return api.get("/resume/analysis");
};