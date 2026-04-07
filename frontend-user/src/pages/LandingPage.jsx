import { Link } from "react-router-dom";
import heroImage from "../assets/images/resume-ai.jpg";
import { Brain, Briefcase, LineChart, Upload, ScanSearch, BarChart3 } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm sticky top-0 z-50">

        <h1 className="text-2xl font-bold text-gray-900">
          Resume<span className="text-blue-600">IQ</span>
        </h1>

        <div className="flex gap-6 items-center">

          <Link
            to="/login"
            className="text-gray-600 font-medium hover:text-black transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-black transition shadow"
          >
            Get Started
          </Link>

        </div>

      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 items-center px-10 py-24 gap-16">

        <div>

          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            AI Powered Resume Analyzer
          </span>

          <h1 className="text-5xl font-bold leading-tight mt-6 mb-6 text-gray-900">
            Smarter Resume Analysis <br />
            For Better Career Opportunities
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            ResumeIQ analyzes your resume, detects missing skills,
            and gives intelligent suggestions to improve your
            chances of landing interviews.
          </p>

          <div className="flex gap-4">

            <Link
              to="/signup"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black transition shadow-md"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Login
            </Link>

          </div>

        </div>

        <div className="flex justify-center">

          <img
            src={heroImage}
            alt="AI Resume Analysis"
            className="rounded-xl shadow-xl w-full max-w-lg transition transform hover:scale-105"
          />

        </div>

      </section>

      {/* STATS */}
      <section className="bg-white py-16 border-y">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-10">

          <div>
            <h3 className="text-4xl font-bold text-gray-900">10K+</h3>
            <p className="text-gray-500 mt-2">Resumes Analyzed</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-gray-900">5K+</h3>
            <p className="text-gray-500 mt-2">Active Users</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-gray-900">12K+</h3>
            <p className="text-gray-500 mt-2">Jobs Tracked</p>
          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-10 py-20">

        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-2">

            <div className="mb-4 text-blue-600 group-hover:scale-110 transition">
              <Brain size={32} />
            </div>

            <h3 className="font-semibold text-xl mb-3 text-gray-800">
              AI Resume Analysis
            </h3>

            <p className="text-gray-600">
              Get instant AI feedback on your resume including
              strengths, weaknesses, and improvement suggestions.
            </p>

          </div>

          <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-2">

            <div className="mb-4 text-blue-600 group-hover:scale-110 transition">
              <Briefcase size={32} />
            </div>

            <h3 className="font-semibold text-xl mb-3 text-gray-800">
              Job Application Tracker
            </h3>

            <p className="text-gray-600">
              Track all your job applications in one place
              and monitor progress like Applied, Interview,
              Offer and Rejected.
            </p>

          </div>

          <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-2">

            <div className="mb-4 text-blue-600 group-hover:scale-110 transition">
              <LineChart size={32} />
            </div>

            <h3 className="font-semibold text-xl mb-3 text-gray-800">
              Career Analytics
            </h3>

            <p className="text-gray-600">
              Visualize your job search progress with
              powerful analytics and insights.
            </p>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20">

        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
          How ResumeIQ Works
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

          <div className="p-8">

            <div className="flex justify-center mb-4 text-blue-600">
              <Upload size={36} />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Upload Resume
            </h3>

            <p className="text-gray-600">
              Upload your resume in seconds and let our
              AI start analyzing it instantly.
            </p>

          </div>

          <div className="p-8">

            <div className="flex justify-center mb-4 text-blue-600">
              <ScanSearch size={36} />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              AI Analysis
            </h3>

            <p className="text-gray-600">
              Our AI detects missing skills, highlights
              strengths, and provides improvement tips.
            </p>

          </div>

          <div className="p-8">

            <div className="flex justify-center mb-4 text-blue-600">
              <BarChart3 size={36} />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Track Progress
            </h3>

            <p className="text-gray-600">
              Monitor job applications and analyze
              your career growth with powerful insights.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-20 text-center">

        <h2 className="text-4xl font-bold mb-6">
          Start Improving Your Resume Today
        </h2>

        <p className="text-gray-300 mb-8 text-lg">
          Join thousands of job seekers using AI to improve their careers.
        </p>

        <Link
          to="/signup"
          className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition shadow-lg"
        >
          Create Free Account
        </Link>

      </section>

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

export default LandingPage;