import React, { useState, useEffect } from "react";
import { MapPin, Briefcase } from "lucide-react";
import api from "../utils/api";

const JobCard = ({ job, onApply }) => {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState(null);

  // ✅ CHECK IF ALREADY APPLIED (FIXED PROPERLY)
  useEffect(() => {
    const checkApplied = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/applications/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 🔥 FIX: compare job_id (not id)
        const alreadyApplied = res.data.some(
          (app) => app.job_id === job.id
        );

        setApplied(alreadyApplied);
      } catch (err) {
        console.log("Check apply error:", err);
      }
    };

    checkApplied();
  }, [job.id]);

  // 🔥 FETCH MATCH DATA
  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get(`/applications/match/${job.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMatch(res.data);
      } catch (err) {
        console.log("Match error:", err);
      }
    };

    fetchMatch();
  }, [job.id]);

  const handleApply = () => {
    if (applied) return;
    onApply(job);
  };

  // 🎨 COLOR BASED ON MATCH
  const getMatchColor = (percent) => {
    if (percent >= 75) return "bg-green-500";
    if (percent >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // 🎯 LEVEL TEXT
  const getMatchLevel = (percent) => {
    if (percent >= 80) return "Excellent Fit";
    if (percent >= 60) return "Good Match";
    if (percent >= 40) return "Average Match";
    return "Low Match";
  };

  // 🎯 BETTER TEXT (NO MORE "NONE")
  const formatSkills = (skills, type) => {
  if (!skills || skills.length === 0) {
    return type === "matched"
      ? "Your resume does not match this job yet"
      : "No specific requirements found in job description";
  }
  return skills.join(", ");
};

  return (
    <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col justify-between min-h-[360px] relative">

      {/* ⭐ BEST MATCH */}
      {match?.matchPercent >= 80 && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
          ⭐ Best Match
        </div>
      )}

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {job.role}
        </h3>

        <div className="flex items-center gap-2 text-gray-700 mb-1">
          <Briefcase size={18} />
          {job.company}
        </div>

        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <MapPin size={18} />
          {job.location}
        </div>

        {/* 🔥 MATCH SECTION */}
        {match ? (
          <div className="mb-5">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-gray-700">
                Resume Match
              </span>
              <span className="text-sm font-bold text-gray-800">
                {match.matchPercent}% • {getMatchLevel(match.matchPercent)}
              </span>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getMatchColor(match.matchPercent)}`}
                style={{ width: `${match.matchPercent}%` }}
              />
            </div>

            {/* SKILLS */}
            <div className="mt-3 text-xs space-y-1">
              <p className="text-green-600">
                ✔ Matching Skills:{" "}
                {formatSkills(match.matchedSkills, "matched")}
              </p>

              <p className="text-red-500">
                ✖ Skills to Improve:{" "}
                {formatSkills(match.missingSkills, "missing")}
              </p>
            </div>

          </div>
        ) : (
          <p className="text-sm text-gray-400 mb-4">
            Upload your resume to see match insights
          </p>
        )}

        {/* DESCRIPTION */}
        {job.description && (
          <p className="text-gray-600 text-sm leading-relaxed">
            {job.description}
          </p>
        )}
      </div>

      {/* APPLY BUTTON */}
      <button
        onClick={handleApply}
        disabled={applied || loading}
        className={`mt-6 w-full py-3 rounded-xl font-semibold text-md transition
          ${
            applied
              ? "bg-green-500 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }
        `}
      >
        {applied ? "Applied ✅" : loading ? "Processing..." : "Apply Now"}
      </button>
    </div>
  );
};

export default JobCard;