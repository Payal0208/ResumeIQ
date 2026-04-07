import { Users, FileText, BarChart3, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    applications: 0,
    jobs: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser || storedUser === "undefined") {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    // ✅ ADMIN PROTECTION
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [usersRes, appsRes, jobsRes] = await Promise.all([
        api.get("/users", config),
        api.get("/applications", config),
        api.get("/jobs", config),
      ]);

      const users = usersRes.data || [];
      const applications = appsRes.data || [];
      const jobs = jobsRes.data || [];

      setStats({
        users: users.length,
        applications: applications.length,
        jobs: jobs.length,
        activeUsers: Math.floor(users.length / 2),
      });

    } catch (err) {
      console.error("Dashboard API Error:", err);

      // ✅ FALLBACK (IMPORTANT 🔥)
      const users =
        JSON.parse(localStorage.getItem("users")) || [];

      const applications =
        JSON.parse(localStorage.getItem("applications")) || [];

      const jobs =
        JSON.parse(localStorage.getItem("jobs")) || [];

      setStats({
        users: users.length,
        applications: applications.length,
        jobs: jobs.length,
        activeUsers: Math.floor(users.length / 2),
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-10 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Admin Control Panel 👑
          </h2>

          <p className="text-gray-600">
            Manage users, monitor applications and track platform activity.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
          alt="Admin Dashboard"
          className="rounded-xl shadow-md"
        />
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto px-10 pb-16">

        <h3 className="text-2xl font-bold mb-8 text-gray-900">
          Platform Statistics
        </h3>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-white p-8 rounded-xl shadow">
            <Users className="text-blue-600 mb-4" size={32} />
            <h4 className="text-3xl font-bold">{stats.users}</h4>
            <p className="text-gray-500">Total Users</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <FileText className="text-blue-600 mb-4" size={32} />
            <h4 className="text-3xl font-bold">{stats.applications}</h4>
            <p className="text-gray-500">Applications</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <BarChart3 className="text-blue-600 mb-4" size={32} />
            <h4 className="text-3xl font-bold">{stats.jobs}</h4>
            <p className="text-gray-500">Jobs Posted</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <Activity className="text-blue-600 mb-4" size={32} />
            <h4 className="text-3xl font-bold">{stats.activeUsers}</h4>
            <p className="text-gray-500">Active Users</p>
          </div>

        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="max-w-7xl mx-auto px-10 pb-16">

        <h3 className="text-2xl font-bold mb-8 text-gray-900">
          Quick Actions
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          <Link to="/admin/manage-jobs">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <h4 className="text-lg font-semibold mb-2">Manage Jobs</h4>
              <p className="text-gray-500 text-sm">
                View, edit and delete all jobs
              </p>
            </div>
          </Link>

          <Link to="/admin/add-job">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <h4 className="text-lg font-semibold mb-2">Add Job</h4>
              <p className="text-gray-500 text-sm">
                Create a new job listing
              </p>
            </div>
          </Link>

          <Link to="/admin/applications">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <h4 className="text-lg font-semibold mb-2">View Applications</h4>
              <p className="text-gray-500 text-sm">
                Manage job applications
              </p>
            </div>
          </Link>

        </div>
      </div>

      {/* ACTIVITY */}
      <div className="max-w-7xl mx-auto px-10 pb-20">

        <h3 className="text-2xl font-bold mb-6 text-gray-900">
          Recent Platform Activity
        </h3>

        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <p>• {stats.users} users registered</p>
          <p>• {stats.applications} applications submitted</p>
          <p>• {stats.jobs} jobs currently available</p>
        </div>

      </div>

      <Footer />

    </div>
  );
};

export default AdminDashboard;