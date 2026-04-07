import api from "../utils/api";

// 📥 GET ALL JOBS
export const getJobs = () => {
  return api.get("/jobs");
};

// ➕ ADD JOB (ADMIN)
export const addJob = (data) => {
  return api.post("/jobs", data);
};

// ❌ DELETE JOB (ADMIN)
export const deleteJob = (id) => {
  return api.delete(`/jobs/${id}`);
};