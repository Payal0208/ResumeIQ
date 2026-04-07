const db = require("../config/db");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

// ✅ SKILL KEYWORDS
const SKILLS = [
  "react", "node", "express", "mongodb", "mysql",
  "javascript", "python", "java", "c++", "html", "css"
];

// ✅ DOMAIN MAPPING
const DOMAIN_MAP = {
  frontend: ["react", "html", "css", "javascript"],
  backend: ["node", "express", "mysql", "mongodb", "java"],
  datascience: ["python"],
};

// ✅ UPLOAD RESUME + ANALYSIS
exports.uploadResume = async (req, res) => {
  try {
    const user_id = req.user.id;
    const file_url = req.file.filename;

    db.query(
      "INSERT INTO resumes (user_id, file_url) VALUES (?, ?)",
      [user_id, file_url],
      async (err, result) => {
        if (err) return res.status(500).json(err);

        const resumeId = result.insertId;

        const filePath = path.join(__dirname, "../uploads", file_url);
        const buffer = fs.readFileSync(filePath);

        const parsed = await pdfParse(buffer);
        const text = parsed.text.toLowerCase();

        // 🔥 SKILL EXTRACTION
        const skills = SKILLS.filter(skill => text.includes(skill));

        // 🔥 EXPERIENCE DETECTION
        let experience = "Fresher";
        if (text.includes("year") || text.includes("experience")) {
          experience = "Experienced";
        }

        // 🔥 EDUCATION DETECTION
        let education = "Not Found";
        if (text.includes("b.tech") || text.includes("bachelor")) {
          education = "Bachelor's Degree";
        }
        if (text.includes("master") || text.includes("m.tech")) {
          education = "Master's Degree";
        }

        // 🔥 PROJECT COUNT (basic detection)
        let projects = 0;
        if (text.includes("project")) projects = 2;
        if (text.includes("projects")) projects = 3;

        // 🔥 DOMAIN DETECTION
        let domains = [];

        Object.keys(DOMAIN_MAP).forEach(domain => {
          const matched = DOMAIN_MAP[domain].some(skill =>
            text.includes(skill)
          );
          if (matched) domains.push(domain);
        });

        if (domains.length === 0) domains.push("general");

        // 🔥 SCORE CALCULATION
        let score = 50;
        score += skills.length * 5;
        score += projects * 5;

        if (experience === "Experienced") score += 10;
        if (education !== "Not Found") score += 10;

        score = Math.min(score, 100);

        // 🔥 SUGGESTIONS
        let suggestions = [];

        if (skills.length < 3) {
          suggestions.push("Add more technical skills");
        }
        if (projects < 2) {
          suggestions.push("Add more projects");
        }
        if (experience === "Fresher") {
          suggestions.push("Mention internships or experience");
        }

        const analysis = {
          score,
          skills,
          experience,
          education,
          projects,
          domains,
          suggestions,
        };

        // ✅ SAVE ANALYSIS
        db.query(
          "UPDATE resumes SET analysis = ? WHERE id = ?",
          [JSON.stringify(analysis), resumeId]
        );

        res.json({
          message: "Resume uploaded & analyzed",
          resume_id: resumeId,
        });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

// ✅ GET ANALYSIS
exports.getAnalysis = (req, res) => {
  const user_id = req.user.id;

  db.query(
    "SELECT analysis FROM resumes WHERE user_id = ? ORDER BY id DESC LIMIT 1",
    [user_id],
    (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length === 0) return res.json(null);

      res.json(JSON.parse(data[0].analysis));
    }
  );
};