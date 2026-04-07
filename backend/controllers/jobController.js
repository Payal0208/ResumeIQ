const db = require("../config/db");

// GET ALL JOBS
exports.getJobs = (req, res) => {
  db.query("SELECT * FROM jobs", (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

// ADD JOB (ADMIN)
exports.addJob = (req, res) => {
  const { company, role, description, location } = req.body;
  const created_by = req.user.id;

  db.query(
    "INSERT INTO jobs (company, role, description, location, created_by) VALUES (?, ?, ?, ?, ?)",
    [company, role, description, location, created_by],
    (err) => {
      if (err) return res.json(err);
      res.json("Job added successfully");
    }
  );
};

// DELETE JOB
exports.deleteJob = (req, res) => {
  db.query("DELETE FROM jobs WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.json(err);
    res.json("Job deleted");
  });
};