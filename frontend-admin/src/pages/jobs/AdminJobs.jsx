import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { getJobs, deleteJob } from "../../services/jobService";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    // ✅ ADMIN PROTECTION
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

  // ✅ FETCH JOBS (API + FALLBACK)
  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);

    } catch (err) {
      console.error("API Error:", err);

      // 🔥 FALLBACK
      const localJobs =
        JSON.parse(localStorage.getItem("jobs")) || [];

      setJobs(localJobs);
    }
  };

  // ✅ DELETE JOB (API + FALLBACK)
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Delete this job?");
    if (!confirmDelete) return;

    try {
      await deleteJob(id);
      fetchJobs();

    } catch (err) {
      console.error("Delete API Error:", err);

      // 🔥 FALLBACK
      const updated = jobs.filter((job) => job.id !== id);

      setJobs(updated);
      localStorage.setItem("jobs", JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="max-w-6xl mx-auto p-10 flex-grow">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Manage Jobs</h2>

          <button
            onClick={() => navigate("/admin/add-job")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Job
          </button>
        </div>

        {/* EMPTY STATE */}
        {jobs.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-500">No jobs available 🚫</p>
          </div>
        ) : (

          <div className="space-y-4">

            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
              >

                {/* JOB INFO */}
                <div>
                  <h3 className="font-semibold text-lg">{job.role}</h3>
                  <p className="text-gray-500">{job.company}</p>
                  <p className="text-sm text-gray-400">{job.location}</p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4">

                  <Link
                    to={`/admin/edit-job/${job.id}`}  // ✅ FIXED ROUTE
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />

    </div>
  );
};

export default AdminJobs;