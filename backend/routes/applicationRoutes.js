const router = require("express").Router();

const {
  applyJob,
  getApplications,
  getUserApplications,
  updateApplicationStatus,
  deleteApplication, // ✅ added
  matchJob
} = require("../controllers/applicationController");

const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

// ✅ USER APPLY
router.post("/apply", verifyToken, applyJob);

// ✅ ADMIN - GET ALL APPLICATIONS
router.get("/", verifyToken, isAdmin, getApplications);

// ✅ USER - GET OWN APPLICATIONS
router.get("/my", verifyToken, getUserApplications);

// ✅ ADMIN - UPDATE APPLICATION STATUS
router.put("/:id", verifyToken, isAdmin, updateApplicationStatus);

// ✅ ADMIN - DELETE APPLICATION 🔥 (IMPORTANT)
router.delete("/:id", verifyToken, isAdmin, deleteApplication);

// ✅ MATCH RESUME WITH JOB
router.get("/match/:job_id", verifyToken, matchJob);


module.exports = router;