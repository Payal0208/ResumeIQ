import { useState, useEffect } from "react";
import JobCard from "../../components/Jobcard";
import ApplyJobModal from "../../components/ApplyJobModal";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const JobTracker = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  // ✅ FETCH JOBS FROM BACKEND
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      {/* HERO */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-16 text-center">

          <h2 className="text-4xl font-bold text-gray-900">
            Explore Opportunities 🚀
          </h2>

          <p className="text-gray-500 mt-3 text-lg">
            Find jobs that match your skills and apply easily
          </p>

        </div>
      </div>

      {/* JOB SECTION */}
      <div className="w-full px-8 py-16 flex-grow">

        <div className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Briefcase size={22} />
            Available Jobs
          </h3>

          <span className="text-gray-500 text-lg">
            {jobs.length} Jobs
          </span>
        </div>

        {/* 🔥 LOADING */}
        {loading ? (
          <div className="text-center text-gray-500 text-lg">
            Loading jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className="max-w-4xl mx-auto bg-white p-16 rounded-2xl shadow text-center">

            <h3 className="text-2xl font-semibold text-gray-700">
              No Jobs Available 😔
            </h3>

            <p className="text-gray-500 mt-3">
              Admin has not posted any jobs yet.
            </p>

          </div>
        ) : (

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={{
                  ...job,
                  title: job.role,
                }}
                onApply={() => setSelectedJob(job)}
              />
            ))}

          </div>
        )}

      </div>

      {/* MODAL */}
      {selectedJob && (
        <ApplyJobModal
          job={{
            ...selectedJob,
            title: selectedJob.role,
          }}
          onClose={() => setSelectedJob(null)}
        />
      )}

      <Footer />

    </div>
  );
};

export default JobTracker;