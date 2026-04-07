import { Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/auth/AdminLogin";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminApplications from "./pages/admin/AdminApplications";
import UserManagement from "./pages/UserManagement";

import AddJob from "./pages/jobs/AddJob";
import EditJob from "./pages/jobs/EditJob";
import AdminJobs from "./pages/jobs/AdminJobs";
import ManageJobs from "./pages/jobs/ManageJobs";

function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/" element={<AdminLogin />} />

      {/* ADMIN */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/applications" element={<AdminApplications />} />
      <Route path="/admin/users" element={<UserManagement />} />

      {/* JOBS */}
      <Route path="/admin/add-job" element={<AddJob />} />
      <Route path="/admin/edit-job/:id" element={<EditJob />} />
      <Route path="/admin/jobs" element={<AdminJobs />} />
      <Route path="/admin/manage-jobs" element={<ManageJobs />} />

      {/* OPTIONAL BACKUP ROUTE */}
      <Route path="/applications" element={<AdminApplications />} />

    </Routes>
  );
}

export default App;