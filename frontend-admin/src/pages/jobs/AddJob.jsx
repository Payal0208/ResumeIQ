import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Briefcase, MapPin, FileText, Building2 } from "lucide-react";
import { addJob } from "../../services/jobService";

const AddJob = () => {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    company: "",
    role: "",
    description: "",
    location: "",
    status: "Open",
  });

  const [loading, setLoading] = useState(false);

  // ✅ ADMIN PROTECTION (FIXED)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser || storedUser === "undefined") {
      navigate("/");
      return;
    }

    const user = JSON.parse(storedUser);

    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !job.company.trim() ||
      !job.role.trim() ||
      !job.description.trim() ||
      !job.location.trim()
    ) {
      alert("Please fill all fields properly");
      return;
    }

    try {
      setLoading(true);

      await addJob(job);

      // ✅ RESET
      setJob({
        company: "",
        role: "",
        description: "",
        location: "",
        status: "Open",
      });

      alert("Job Added Successfully 🎉");

      navigate("/admin/dashboard"); // ✅ UPDATED ROUTE

    } catch (err) {
      console.error("Add Job Error:", err);
      alert(err.response?.data?.message || "Failed to add job ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="flex-grow flex flex-col items-center px-4 py-12">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Add New Job
          </h2>
          <p className="text-gray-500 mt-2">
            Create a job listing that will be visible to users
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-2xl border border-gray-100"
        >

          <div className="grid md:grid-cols-2 gap-6">

            {/* COMPANY */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <div className="flex items-center border rounded-lg px-3">
                <Building2 className="text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Google"
                  className="w-full p-2 outline-none"
                  value={job.company}
                  onChange={(e) =>
                    setJob({ ...job, company: e.target.value })
                  }
                />
              </div>
            </div>

            {/* ROLE */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Job Role
              </label>
              <div className="flex items-center border rounded-lg px-3">
                <Briefcase className="text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Frontend Developer"
                  className="w-full p-2 outline-none"
                  value={job.role}
                  onChange={(e) =>
                    setJob({ ...job, role: e.target.value })
                  }
                />
              </div>
            </div>

            {/* LOCATION */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="flex items-center border rounded-lg px-3">
                <MapPin className="text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Remote / Pune / Bangalore"
                  className="w-full p-2 outline-none"
                  value={job.location}
                  onChange={(e) =>
                    setJob({ ...job, location: e.target.value })
                  }
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <div className="flex border rounded-lg px-3 py-2">
                <FileText className="text-gray-400 mt-1 mr-2" size={18} />
                <textarea
                  rows="4"
                  className="w-full outline-none resize-none"
                  value={job.description}
                  onChange={(e) =>
                    setJob({ ...job, description: e.target.value })
                  }
                />
              </div>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 mt-8">

            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Job"}
            </button>

          </div>

        </form>

      </div>

      <Footer />

    </div>
  );
};

export default AddJob;