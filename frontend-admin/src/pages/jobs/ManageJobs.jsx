import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { getJobs, deleteJob } from "../../services/jobService";

const ManageJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ ADMIN + FETCH JOBS
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser || storedUser === "undefined") {
      navigate("/");
      return;
    }

    const user = JSON.parse(storedUser);

    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchJobs();
  }, [navigate]);

  // ✅ FETCH JOBS (BACKEND + FALLBACK)
  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data || []);
    } catch (err) {
      console.error("Backend failed, loading local jobs...", err);

      // 🔥 FALLBACK (LOCAL STORAGE)
      const localJobs =
        JSON.parse(localStorage.getItem("jobs")) || [];

      setJobs(localJobs);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE JOB (BACKEND + FALLBACK)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this job?");
    if (!confirmDelete) return;

    try {
      await deleteJob(id);

      // ✅ UPDATE UI (MYSQL uses id)
      setJobs((prev) =>
        prev.filter((job) => job.id !== id)
      );

      alert("Job deleted successfully ✅");

    } catch (err) {
      console.error("Delete failed, using fallback...", err);

      // 🔥 FALLBACK DELETE
      const updatedJobs = jobs.filter(
        (job) => job.id !== id
      );

      setJobs(updatedJobs);

      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    }
  };

  // ✅ EDIT NAVIGATION
  const handleEdit = (id) => {
    navigate(`/admin/edit-job/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-14 flex-grow">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Manage Jobs
            </h2>
            <p className="text-gray-500 text-sm">
              View, edit and manage all job listings
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-job")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto"
          >
            + Add Job
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg">
              No jobs available 🚫
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">

            <table className="w-full text-left">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Company</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium">
                      {job.company}
                    </td>

                    <td>{job.role}</td>

                    <td>{job.location}</td>

                    <td className="max-w-xs truncate">
                      {job.description}
                    </td>

                    <td className="text-center space-x-3">

                      <button
                        onClick={() => handleEdit(job.id)}
                        className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        <Pencil size={16} /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-600 hover:underline inline-flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

      <Footer />

    </div>
  );
};

export default ManageJobs;