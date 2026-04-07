import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../utils/api";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ store token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful ✅");

      // ✅ role-based redirect
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
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
          to="/signup"
          className="text-gray-600 font-medium hover:text-black transition"
        >
          Create Account
        </Link>
      </nav>

      {/* LOGIN SECTION */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">

        <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-md overflow-hidden">

          {/* IMAGE */}
          <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-10">
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4"
              alt="Resume Analysis"
              className="rounded-lg shadow-lg max-w-sm"
            />
          </div>

          {/* FORM */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-10">

            <div className="w-full max-w-sm">

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>

              <p className="text-gray-500 mb-8">
                Login to continue using ResumeIQ
              </p>

              <form className="space-y-5" onSubmit={handleSubmit}>

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  disabled={loading}
                  className={`w-full py-3 rounded-lg transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-900 hover:bg-black text-white"
                  }`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

              </form>

              {/* Divider */}
              {/* <div className="flex items-center my-6">
                <div className="flex-1 border-t"></div>
                <span className="px-3 text-gray-400 text-sm">OR</span>
                <div className="flex-1 border-t"></div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition">
                <FaGoogle className="text-red-500" />
                Continue with Google
              </button> */}

              <p className="text-gray-500 mt-6 text-center text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>

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

export default Login;