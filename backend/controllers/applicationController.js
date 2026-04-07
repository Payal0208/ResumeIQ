const db = require("../config/db");

// ✅ APPLY JOB
exports.applyJob = (req, res) => {
  const { job_id, domain, resume_id } = req.body;
  const user_id = req.user.id;

  if (!job_id || !domain || !resume_id) {
    return res.status(400).json({
      message: "All fields are required including resume",
    });
  }

  db.query(
    "SELECT * FROM applications WHERE user_id = ? AND job_id = ?",
    [user_id, job_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.json({ message: "Already applied" });
      }

      db.query(
        `INSERT INTO applications 
        (user_id, job_id, resume_id, domain, status) 
        VALUES (?, ?, ?, ?, ?)`,
        [user_id, job_id, resume_id, domain, "Applied"],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json(err);
          }

          res.json({ message: "Applied successfully" });
        }
      );
    }
  );
};

// ✅ ADMIN - GET ALL APPLICATIONS
exports.getApplications = (req, res) => {
  db.query(
    `SELECT 
        a.id,
        a.job_id,
        a.status,
        a.domain,
        u.name,
        u.email,
        j.role,
        j.company,
        r.file_url
     FROM applications a
     JOIN users u ON a.user_id = u.id
     JOIN jobs j ON a.job_id = j.id
     LEFT JOIN resumes r ON a.resume_id = r.id
     ORDER BY a.id DESC`,
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    }
  );
};

// ✅ USER - GET OWN APPLICATIONS
exports.getUserApplications = (req, res) => {
  const user_id = req.user.id;

  db.query(
    `SELECT 
        a.id,
        a.job_id,
        a.status,
        a.domain,
        j.role,
        j.company,
        j.location,
        r.file_url
     FROM applications a
     JOIN jobs j ON a.job_id = j.id
     LEFT JOIN resumes r ON a.resume_id = r.id
     WHERE a.user_id = ?
     ORDER BY a.id DESC`,
    [user_id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    }
  );
};

// ✅ UPDATE STATUS
exports.updateApplicationStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  db.query(
    "UPDATE applications SET status = ? WHERE id = ?",
    [status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Status updated successfully" });
    }
  );
};

// ✅ DELETE APPLICATION
exports.deleteApplication = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM applications WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Application deleted successfully" });
    }
  );
};

// ✅ 🔥 FINAL SMART MATCH LOGIC (FIXED PROPERLY)
exports.matchJob = (req, res) => {
  const user_id = req.user.id;
  const { job_id } = req.params;

  // 1️⃣ GET RESUME
  db.query(
    "SELECT analysis FROM resumes WHERE user_id = ? ORDER BY id DESC LIMIT 1",
    [user_id],
    (err, resumeData) => {
      if (err) return res.status(500).json(err);

      if (resumeData.length === 0) {
        return res.json({
          matchPercent: 0,
          matchedSkills: [],
          missingSkills: [],
          level: "No Resume Uploaded",
        });
      }

      let analysis = {};

      try {
        analysis = JSON.parse(resumeData[0].analysis || "{}");
      } catch {
        return res.json({
          matchPercent: 0,
          matchedSkills: [],
          missingSkills: [],
          level: "Analysis Error",
        });
      }

      const resumeSkills = (analysis.skills || []).map((s) =>
        s.toLowerCase()
      );

      // 2️⃣ GET JOB
      db.query(
        "SELECT role, description FROM jobs WHERE id = ?",
        [job_id],
        (err, jobData) => {
          if (err) return res.status(500).json(err);

          if (jobData.length === 0) {
            return res.json({ message: "Job not found" });
          }

          const jobText = (
            jobData[0].role + " " + jobData[0].description
          ).toLowerCase();

          // 🔥 SKILLS LIST
          const SKILLS = [
            "react", "node", "express", "mongodb",
            "mysql", "javascript", "python", "java",
            "html", "css", "typescript", "nextjs",
            "redux", "tailwind", "docker", "aws",
            "c++", "c#", "spring", "git", "django"
          ];

          // 🔥 EXTRACT JOB SKILLS
          const jobSkills = [];

          SKILLS.forEach((skill) => {
            if (jobText.includes(skill)) {
              jobSkills.push(skill);
            }
          });

          // ❌ IF NO SKILLS FOUND → RETURN MEANINGFUL RESPONSE
          if (jobSkills.length === 0) {
            return res.json({
              matchPercent: 0,
              matchedSkills: [],
              missingSkills: [],
              level: "No Skill Data",
              message: "Job description does not contain recognizable skills",
            });
          }

          // 🔥 MATCHING
          const matched = [];
          const missing = [];

          jobSkills.forEach((skill) => {
            if (resumeSkills.includes(skill)) {
              matched.push(skill);
            } else {
              missing.push(skill);
            }
          });

          const matchPercent = Math.round(
            (matched.length / jobSkills.length) * 100
          );

          // 🎯 LEVEL
          let level = "Low Match";
          if (matchPercent >= 80) level = "Excellent Match";
          else if (matchPercent >= 60) level = "Good Match";
          else if (matchPercent >= 40) level = "Average Match";

          res.json({
            matchPercent,
            matchedSkills: matched,
            missingSkills: missing,
            level,
          });
        }
      );
    }
  );
};