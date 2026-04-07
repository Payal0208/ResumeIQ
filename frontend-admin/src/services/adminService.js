import axios from "axios";

const API = "http://localhost:5000/api";

export const getJobs = async () => {
  const res = await axios.get(`${API}/jobs`);
  return res.data;
};

export const getJobById = async (id) => {
  const res = await axios.get(`${API}/jobs/${id}`);
  return res.data;
};

export const addJob = async (job) => {
  const res = await axios.post(`${API}/jobs`, job);
  return res.data;
};

export const updateJob = async (id, job) => {
  const res = await axios.put(`${API}/jobs/${id}`, job);
  return res.data;
};