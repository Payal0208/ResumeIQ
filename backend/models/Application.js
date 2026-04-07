const db = require("../config/db");

exports.applyJob = (data, callback) => {
  const { user_id, job_id, resume_id, domain } = data;

  db.query(
    "INSERT INTO applications (user_id, job_id, resume_id, domain) VALUES (?, ?, ?, ?)",
    [user_id, job_id, resume_id, domain],
    callback
  );
};

exports.getApplications = (callback) => {
  db.query(
    `SELECT a.*, u.name, j.role, j.company 
     FROM applications a
     JOIN users u ON a.user_id = u.id
     JOIN jobs j ON a.job_id = j.id`,
    callback
  );
};