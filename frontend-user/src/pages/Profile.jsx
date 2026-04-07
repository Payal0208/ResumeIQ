import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/api";

const Profile = () => {

  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    fetchUserApplications();
  }, []);

  // ✅ FETCH FROM BACKEND
  const fetchUserApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/applications/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data || []);

    } catch (err) {
      console.error("Failed to fetch user applications:", err);
      alert("Could not load applications ❌");
    }
  };

  // 🎨 STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-600";
      case "Under Review":
        return "bg-yellow-100 text-yellow-600";
      case "Interview":
        return "bg-purple-100 text-purple-600";
      case "Selected":
        return "bg-green-100 text-green-600";
      case "Rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="max-w-6xl mx-auto p-10 flex-grow">

        {/* USER INFO */}
        <div className="bg-white p-8 rounded-xl shadow mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Profile Details
          </h2>

          <p className="mb-2">
            <strong>Name:</strong> {user?.name || "User"}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        {/* APPLICATIONS */}
        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            My Applications
          </h2>

          {applications.length === 0 ? (
            <p className="text-gray-500">
              No applications yet.
            </p>
          ) : (
            <div className="space-y-4">

              {applications.map((app) => (
                <div
                  key={app.id}
                  className="border p-5 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {app.role}
                    </h3>

                    <p className="text-gray-600">
                      {app.company}
                    </p>

                    <p className="text-sm text-gray-500">
                      Domain: {app.domain}
                    </p>

                    <p className="text-sm text-gray-400">
                      Location: {app.location}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default Profile;