import api from "../utils/api";

// ✅ GET ALL JOBS
export const getJobs = () => {
  return api.get("/jobs");
};

// ✅ GET SINGLE JOB 🔥 (THIS WAS MISSING)
export const getJobById = async (id) => {
  const res = await api.get(`/jobs/${id}`);
  return res.data;
};

// ✅ ADD JOB
export const addJob = (data) => {
  return api.post("/jobs", data);
};

// ✅ UPDATE JOB
export const updateJob = (id, data) => {
  return api.put(`/jobs/${id}`, data);
};

// ✅ DELETE JOB
export const deleteJob = (id) => {
  return api.delete(`/jobs/${id}`);
};