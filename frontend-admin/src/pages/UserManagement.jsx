import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const UserManagement = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    // ✅ PROTECTION
    if (!storedUser || storedUser === "undefined") {
      navigate("/");
      return;
    }

    const user = JSON.parse(storedUser);

    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchUsers();

  }, [navigate]);

  // ✅ FETCH USERS (BACKEND + FALLBACK)
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res?.data || [];

      setUsers(data);

    } catch (err) {
      console.error("Backend failed, loading localStorage users...", err);

      // 🔥 FALLBACK
      const localUsers =
        JSON.parse(localStorage.getItem("users")) || [];

      setUsers(localUsers);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE USER (BACKEND + FALLBACK)
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ UPDATE UI WITHOUT REFETCH
      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );

      alert("User deleted successfully ✅");

    } catch (err) {
      console.error("Delete failed, using local fallback...", err);

      // 🔥 FALLBACK DELETE
      const updatedUsers = users.filter(
        (user) => user.id !== id
      );

      setUsers(updatedUsers);

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );

      alert("Deleted locally (API failed)");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="max-w-6xl mx-auto py-16 px-6 flex-grow">

        <h2 className="text-3xl font-bold mb-10">
          User Management 👥
        </h2>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg">
              No users found 🚫
            </p>
          </div>
        ) : (
          <table className="w-full bg-white shadow rounded-xl overflow-hidden">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th>Email</th>
                <th className="text-center">Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">

                  <td className="p-4 font-medium">
                    {user.name || "N/A"}
                  </td>

                  <td>{user.email || "N/A"}</td>

                  <td className="text-center">
                    {user.role || "user"}
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

      <Footer />

    </div>
  );
};

export default UserManagement;