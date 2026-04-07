import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getJobById, updateJob } from "../../services/jobService";

const EditJob = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

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

    fetchJob();

  }, [id, navigate]);

  // ✅ FETCH JOB (API + FALLBACK)
  const fetchJob = async () => {
    try {
      const res = await getJobById(id);

      // ✅ HANDLE API RESPONSE
      const data = res?.data || res;

      setJob(data);

    } catch (err) {
      console.error("API Error:", err);

      // 🔥 FALLBACK (LOCAL STORAGE)
      const jobs =
        JSON.parse(localStorage.getItem("jobs")) || [];

      const found = jobs.find((j) => j.id === Number(id));

      if (!found) {
        alert("Job not found ❌");
        navigate("/admin/dashboard");
        return;
      }

      setJob(found);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE JOB (API + FALLBACK)
  const handleUpdate = async () => {

    if (
      !job.company?.trim() ||
      !job.role?.trim() ||
      !job.description?.trim() ||
      !job.location?.trim()
    ) {
      alert("Please fill all fields properly");
      return;
    }

    try {
      await updateJob(id, job);

      alert("Job Updated Successfully ✅");
      navigate("/admin/dashboard");

    } catch (err) {
      console.error("Update API Error:", err);

      // 🔥 FALLBACK (LOCAL STORAGE)
      const jobs =
        JSON.parse(localStorage.getItem("jobs")) || [];

      const updatedJobs = jobs.map((j) =>
        j.id === Number(id)
          ? {
              ...job,
              id: Number(id)
            }
          : j
      );

      localStorage.setItem("jobs", JSON.stringify(updatedJobs));

      alert("Updated locally (API failed)");
      navigate("/admin/dashboard");
    }
  };

  // ✅ LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Job not found ❌</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="flex-grow flex justify-center items-center px-4">

        <div className="bg-white p-10 rounded-xl shadow w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Edit Job
          </h2>

          {/* COMPANY */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Company</label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg mt-1"
              value={job.company || ""}
              onChange={(e) =>
                setJob({ ...job, company: e.target.value })
              }
            />
          </div>

          {/* ROLE */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Role</label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg mt-1"
              value={job.role || ""}
              onChange={(e) =>
                setJob({ ...job, role: e.target.value })
              }
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              className="w-full border p-2 rounded-lg mt-1"
              rows="4"
              value={job.description || ""}
              onChange={(e) =>
                setJob({ ...job, description: e.target.value })
              }
            />
          </div>

          {/* LOCATION */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Location</label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg mt-1"
              value={job.location || ""}
              onChange={(e) =>
                setJob({ ...job, location: e.target.value })
              }
            />
          </div>

          {/* STATUS */}
          <div className="mb-6">
            <label className="text-sm text-gray-600">Status</label>
            <select
              className="w-full border p-2 rounded-lg mt-1"
              value={job.status || "Applied"}
              onChange={(e) =>
                setJob({ ...job, status: e.target.value })
              }
            >
              <option>Applied</option>
              <option>Under Review</option>
              <option>Interview</option>
              <option>Selected</option>
              <option>Rejected</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">

            <button
              onClick={() => navigate("/admin/dashboard")}
              className="w-full border py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
            >
              Update Job
            </button>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default EditJob;