const db = require("../config/db");

exports.saveResume = (user_id, file_url, callback) => {
  db.query(
    "INSERT INTO resumes (user_id, file_url) VALUES (?, ?)",
    [user_id, file_url],
    callback
  );
};