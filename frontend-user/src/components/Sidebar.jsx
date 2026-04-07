import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col">

      <h2 className="text-2xl font-bold mb-10">
        Resume<span className="text-blue-500">IQ</span>
      </h2>

      <div className="flex flex-col gap-5 text-gray-300">

        <Link to="/dashboard" className="hover:text-white">
          Dashboard
        </Link>

        <Link to="/resume-upload" className="hover:text-white">
          Upload Resume
        </Link>

        <Link to="/resume-analysis" className="hover:text-white">
          Resume Analysis
        </Link>

        <Link to="/jobs" className="hover:text-white">
          Job Tracker
        </Link>

        <Link to="/profile" className="hover:text-white">
          Profile
        </Link>

      </div>

    </div>
  );
};

export default Sidebar;