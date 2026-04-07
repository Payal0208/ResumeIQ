import { Link, useNavigate } from "react-router-dom";
import { Upload, Briefcase, Brain } from "lucide-react";
import { useEffect } from "react"; // ✅ added
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const UserDashboard = () => {

  const navigate = useNavigate();

  // ✅ Get logged-in user safely
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ✅ Protect route (redirect if not logged in)
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }
}, []);

  // ✅ Fixed logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // 🔥 important fix
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* ✅ GLOBAL NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div className="max-w-6xl mx-auto px-10 py-12 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome {user?.name || "User"} 👋
          </h2>

          <p className="text-gray-600 mb-6">
            Upload your resume and let our AI analyze it to improve your job
            chances with actionable insights.
          </p>

          <Link
            to="/resume-upload"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Upload Resume
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc"
          alt="AI Resume Analysis"
          className="rounded-xl shadow-md w-full object-cover"
        />

      </div>

      {/* DASHBOARD CARDS */}
      <div className="max-w-6xl mx-auto px-10 pb-16">

        <h3 className="text-2xl font-bold mb-8 text-gray-900">
          Dashboard Tools
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Upload Resume */}
          <Link to="/resume-upload">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition cursor-pointer border border-gray-100">

              <Upload className="text-blue-600 mb-4" size={34} />

              <h4 className="text-xl font-semibold mb-2">
                Upload Resume
              </h4>

              <p className="text-gray-600">
                Upload your resume to get AI feedback instantly.
              </p>

            </div>
          </Link>

          {/* Resume Analysis */}
          <Link to="/resume-analysis">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition cursor-pointer border border-gray-100">

              <Brain className="text-blue-600 mb-4" size={34} />

              <h4 className="text-xl font-semibold mb-2">
                Resume Analysis
              </h4>

              <p className="text-gray-600">
                AI analyzes your resume and gives improvement suggestions.
              </p>

            </div>
          </Link>

          {/* Job Opportunities */}
          <Link to="/jobs">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition cursor-pointer border border-gray-100">

              <Briefcase className="text-blue-600 mb-4" size={34} />

              <h4 className="text-xl font-semibold mb-2">
                Job Opportunities
              </h4>

              <p className="text-gray-600">
                View jobs that match your resume and apply instantly.
              </p>

            </div>
          </Link>

        </div>

      </div>

      {/* ✅ GLOBAL FOOTER */}
      <Footer />

    </div>
  );
};

export default UserDashboard;