import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-sm sticky top-0 z-50">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-2xl font-bold text-gray-900 cursor-pointer tracking-wide"
      >
        Resume<span className="text-blue-600">IQ</span>
      </h1>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6">

        <Link
          to="/dashboard"
          className={`font-medium transition ${
            location.pathname === "/dashboard"
              ? "text-blue-600"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/resume-upload"
          className={`font-medium transition ${
            location.pathname === "/resume-upload"
              ? "text-blue-600"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Upload
        </Link>

        <Link
          to="/jobs"
          className={`font-medium transition ${
            location.pathname === "/jobs"
              ? "text-blue-600"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Jobs
        </Link>

        <Link
          to="/profile"
          className={`font-medium transition ${
            location.pathname === "/profile"
              ? "text-blue-600"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Profile
        </Link>

        {/* USER INFO */}
        <div className="hidden md:flex items-center gap-2 ml-4">

          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <span className="text-sm text-gray-600 font-medium">
            {user?.name || user?.email || "User"}
          </span>

        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;