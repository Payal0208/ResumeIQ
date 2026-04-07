import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../utils/api";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const user = res.data.user;

      // ✅ Allow only admin
      if (user.role !== "admin") {
        alert("Access denied! Not an admin ❌");
        return;
      }

      // ✅ Store token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Admin Login Successful 👑");

      // 🔥 FIXED ROUTE
      navigate("/admin/dashboard");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm sticky top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Resume<span className="text-blue-600">IQ</span>
        </Link>

        <Link
          to="/login"
          className="text-gray-600 font-medium hover:text-black transition"
        >
          User Login
        </Link>
      </nav>

      {/* ADMIN LOGIN */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">

        <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-md overflow-hidden">

          {/* IMAGE */}
          <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-10">
            <img
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296"
              alt="Admin Dashboard"
              className="rounded-lg shadow-lg max-w-sm"
            />
          </div>

          {/* FORM */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-10">

            <div className="w-full max-w-sm">

              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
                Admin Portal
              </span>

              <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
                Admin Login
              </h2>

              <p className="text-gray-500 mb-8">
                Access ResumeIQ administration dashboard
              </p>

              <form className="space-y-5" onSubmit={handleSubmit}>

                <input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>

                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Login as Admin
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-white py-8 text-center border-t">
        <h3 className="text-lg font-semibold text-gray-900">
          Resume<span className="text-blue-600">IQ</span>
        </h3>

        <p className="text-gray-500 mt-2 text-sm">
          Smarter Resume Analysis Powered by AI
        </p>

        <p className="text-gray-400 mt-4 text-sm">
          © 2026 ResumeIQ • All Rights Reserved
        </p>
      </footer>

    </div>
  );
};

export default AdminLogin;