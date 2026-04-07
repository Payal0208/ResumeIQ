import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ PROTECT ROUTE
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

    fetchApplications();
  }, [navigate]);

  // ✅ FETCH APPLICATIONS (BACKEND + FALLBACK)
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

       console.log("🔥 API RESPONSE:", res.data);

      setApplications(res.data || []);
    } catch (err) {
      console.error("Backend failed, loading local data...", err);

      // 🔥 FALLBACK
      const localApps =
        JSON.parse(localStorage.getItem("applications")) || [];

      setApplications(localApps);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE STATUS (BACKEND + FALLBACK)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/applications/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchApplications();
    } catch (err) {
      console.error("Status update failed, using fallback...", err);

      // 🔥 FALLBACK UPDATE
      const updatedApps = applications.map((app) =>
        (app.id || app._id) === id
          ? { ...app, status: newStatus }
          : app
      );

      setApplications(updatedApps);

      localStorage.setItem(
        "applications",
        JSON.stringify(updatedApps)
      );
    }
  };

  // ✅ DELETE (BACKEND + FALLBACK)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this application?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchApplications();
    } catch (err) {
      console.error("Delete failed, using fallback...", err);

      // 🔥 FALLBACK DELETE
      const updatedApps = applications.filter(
        (app) => (app.id || app._id) !== id
      );

      setApplications(updatedApps);

      localStorage.setItem(
        "applications",
        JSON.stringify(updatedApps)
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 flex-grow">

        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Job Applications 📄
          </h2>
        </div>

        {/* ✅ LOADING */}
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-16 text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              No applications yet 🚫
            </h3>
            <p className="text-gray-500 mt-2">
              Applications will appear here once users apply.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full text-left">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Job Role</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Domain</th>
                  <th className="p-4">Resume</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Update</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => {

                  const appId = app.id || app._id;

                  return (
                    <tr key={appId} className="border-t">

                      <td className="p-4">
                        {app.name || "N/A"}
                      </td>

                      <td className="p-4">
                        {app.role || "N/A"}
                      </td>

                      <td className="p-4">
                        {app.company || "N/A"}
                      </td>

                      <td className="p-4">
                        {app.domain || "N/A"}
                      </td>

                      <td className="p-4">
                        {app.file_url ? (
                      <a
                       href={`http://localhost:5000/uploads/${app.file_url}`}
                       target="_blank"
                       rel="noreferrer"
                       className="text-blue-600 underline"
                      >
                      View Resume
                      </a>
                      
                      ) : (
                      <span className="text-gray-400">No Resume</span>
                      )}
                      </td>

                      <td className="p-4 font-semibold">
                        {app.status || "Applied"}
                      </td>

                      <td className="p-4">
                        <select
                          value={app.status || "Applied"}
                          onChange={(e) =>
                            handleStatusChange(appId, e.target.value)
                          }
                          className="border px-3 py-1 rounded"
                        >
                          <option>Applied</option>
                          <option>Under Review</option>
                          <option>Interview</option>
                          <option>Selected</option>
                          <option>Rejected</option>
                        </select>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(appId)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>

          </div>
        )}

      </div>

      <Footer />

    </div>
  );
};

export default AdminApplications;