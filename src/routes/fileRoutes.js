const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { uploadFile, getFiles } = require("../controllers/fileController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getFiles);
router.post("/", protect, upload.single("file"), uploadFile);

module.exports = router;
