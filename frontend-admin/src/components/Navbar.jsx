import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`relative font-medium transition px-2 py-1
        ${
          location.pathname === path
            ? "text-blue-600"
            : "text-gray-600 hover:text-black"
        }`}
    >
      {label}

      {/* 🔥 ACTIVE UNDERLINE */}
      {location.pathname === path && (
        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-600 rounded-full"></span>
      )}
    </Link>
  );

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-sm sticky top-0 z-50">

      {/* LOGO */}
      <div
        onClick={() => navigate("/admin/dashboard")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <h1 className="text-2xl font-bold text-gray-900">
          Resume<span className="text-blue-600">IQ</span>
        </h1>

        {/* ADMIN BADGE */}
        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
          Admin
        </span>
      </div>

      {/* NAV LINKS */}
      <div className="flex items-center gap-8">

        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/manage-jobs">Jobs</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/applications">Applications</Link>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* ADMIN AVATAR */}
        <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center rounded-full font-semibold">
          A
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;