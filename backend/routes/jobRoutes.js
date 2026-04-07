const router = require("express").Router();

const {
  getJobs,
  addJob,
  deleteJob
} = require("../controllers/jobController")

const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

// GET all jobs (user + admin)
router.get("/", getJobs);

// ADD job (admin)
router.post("/", verifyToken, addJob);

// DELETE job (admin)
router.delete("/:id", verifyToken, deleteJob);

router.post("/", verifyToken, isAdmin, addJob);
router.delete("/:id", verifyToken, isAdmin, deleteJob);

module.exports = router;