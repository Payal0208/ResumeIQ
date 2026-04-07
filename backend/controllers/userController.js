const db = require("../config/db");

// GET USERS
exports.getUsers = (req, res) => {
  db.query("SELECT id,name,email,role FROM users", (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

// DELETE USER
exports.deleteUser = (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.json(err);
    res.json("User deleted");
  });
};