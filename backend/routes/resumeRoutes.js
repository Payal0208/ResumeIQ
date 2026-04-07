const router = require("express").Router();
const multer = require("multer");

const {
  uploadResume,
  getAnalysis,
} = require("../controllers/resumeController");

const { verifyToken } = require("../middleware/authMiddleware");

// ✅ STORE FILE WITH ORIGINAL NAME
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ ROUTES
router.post("/upload", verifyToken, upload.single("file"), uploadResume);
router.get("/analysis", verifyToken, getAnalysis);

module.exports = router;