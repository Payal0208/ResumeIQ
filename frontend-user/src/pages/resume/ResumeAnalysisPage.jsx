import { useEffect, useState } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ResumeAnalysisPage = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/resume/analysis", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ IMPORTANT
          },
        });

        setAnalysis(res.data);

      } catch (err) {
        console.error("Analysis Error:", err);
        alert("Failed to fetch analysis ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  // ✅ LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading analysis...
      </div>
    );
  }

  // ✅ NO DATA
  if (!analysis || analysis.message) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Upload resume first 📄
          </p>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="max-w-4xl mx-auto p-10 flex-grow">

        <h1 className="text-3xl font-bold mb-10">
          Resume Analysis Report 📊
        </h1>

        {/* 🔥 SCORE CARD */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <h2 className="font-semibold mb-3 text-gray-700">
            ATS Score
          </h2>

          <p className="text-4xl text-blue-600 font-bold mb-4">
            {analysis.score}/100
          </p>

          {/* ✅ PROGRESS BAR */}
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-3"
              style={{ width: `${analysis.score}%` }}
            ></div>
          </div>

        </div>

        {/* 🔥 SKILLS */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <h2 className="font-semibold mb-3 text-gray-700">
            Detected Skills
          </h2>

          {analysis.skills.length === 0 ? (
            <p className="text-gray-500">
              No skills detected ❌
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {analysis.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* 🔥 DOMAINS */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-3 text-gray-700">
            Recommended Domains
          </h2>

          {analysis.domains.length === 0 ? (
            <p className="text-gray-500">
              No domain detected ❌
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {analysis.domains.map((domain, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm"
                >
                  {domain}
                </span>
              ))}
            </div>
          )}

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default ResumeAnalysisPage;