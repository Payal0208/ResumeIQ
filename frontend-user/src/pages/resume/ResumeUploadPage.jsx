import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ResumeUploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload your resume first!");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // 🔥 STEP 1: Upload Resume
      const formData = new FormData();
      formData.append("file", file);

      await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
      });

      // 🔥 STEP 2: Get Analysis
      const res = await api.get("/resume/analysis", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
      });

      localStorage.setItem("resumeAnalysis", JSON.stringify(res.data));

      alert("✅ Resume Uploaded & Analyzed Successfully!");

      navigate("/resume-analysis");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">

        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg text-center">

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Upload Your Resume
          </h1>

          <p className="text-gray-500 mb-8">
            Get AI-powered analysis and improve your chances 🚀
          </p>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileSelect}
          />

          <div
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition"
          >
            <p className="text-gray-600">Click to choose file</p>
            <p className="text-sm text-gray-400 mt-2">
              PDF, DOC, DOCX allowed
            </p>
          </div>

          {file && (
            <div className="mt-4 text-green-600 font-medium">
              📄 {file.name}
            </div>
          )}

          <div className="flex gap-4 mt-8 justify-center">

            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg"
            >
              Choose File
            </button>

            <button
              onClick={handleUpload}
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Uploading..." : "Upload Resume"}
            </button>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ResumeUploadPage;