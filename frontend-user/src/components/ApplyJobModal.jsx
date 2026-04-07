import { useState, useEffect } from "react";
import api from "../utils/api";

const ApplyJobModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);

  // ✅ Load user data
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      const user =
        stored && stored !== "undefined" ? JSON.parse(stored) : null;

      if (user) {
        setFormData((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
        }));
      }
    } catch {
      console.log("User parse error");
    }
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.domain) {
      alert("Please select a domain");
      return;
    }

    if (!formData.resume) {
      alert("Please upload your resume");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("User not authenticated ❌");
        return;
      }

      // 🔥 STEP 1: Upload Resume
      const resumeData = new FormData();
      resumeData.append("file", formData.resume);

      const uploadRes = await api.post("/resume/upload", resumeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const resume_id = uploadRes.data?.resume_id;

      if (!resume_id) {
        throw new Error("Resume upload failed");
      }

      console.log("✅ Resume ID:", resume_id);

      // 🔥 STEP 2: Apply Job
      await api.post(
        "/applications/apply",
        {
          job_id: job.id || job._id, // ✅ FIX SAFE
          domain: formData.domain,
          resume_id: resume_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Application Submitted Successfully!");
      onClose();

    } catch (err) {
      console.error("❌ Apply Error:", err);

      if (err.response?.status === 403) {
        alert("Unauthorized! Please login again ❌");
      } else {
        alert(err.response?.data?.message || "Application failed ❌");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Apply for <span className="text-blue-600">{job.role}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            value={formData.name}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100"
          />

          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100"
          />

          <select
            name="domain"
            value={formData.domain}
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option value="">Select Domain</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full Stack</option>
            <option>Data Science</option>
          </select>

          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            className="w-full"
            onChange={handleChange}
          />

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Applying..." : "Submit"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default ApplyJobModal;