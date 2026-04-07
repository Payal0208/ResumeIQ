const router = require("express").Router();
const { getUsers, deleteUser } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

router.get("/", verifyToken, getUsers);
router.delete("/:id", verifyToken, deleteUser);
router.get("/", verifyToken, isAdmin, getUsers);
router.delete("/:id", verifyToken, isAdmin, deleteUser);

module.exports = router;