import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import UserDashboard from "./pages/dashboard/UserDashboard";

import ResumeUploadPage from "./pages/resume/ResumeUploadPage";
import ResumeAnalysisPage from "./pages/resume/ResumeAnalysisPage";

import JobTracker from "./pages/jobs/JobTracker";


import Profile from "./pages/Profile";

/* -------- Protected Routes -------- */

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

/* -------- App -------- */

function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* User Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Resume Features */}
      <Route
        path="/resume-upload"
        element={
          <ProtectedRoute>
            <ResumeUploadPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-analysis"
        element={
          <ProtectedRoute>
            <ResumeAnalysisPage />
          </ProtectedRoute>
        }
      />

      {/* Job Tracker */}
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <JobTracker />
          </ProtectedRoute>
        }
      />

    

      {/* Other Pages */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;