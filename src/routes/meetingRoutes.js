const express = require("express");
const { createRoom, getRoom, listMeetings } = require("../controllers/meetingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, listMeetings);
router.post("/", protect, createRoom);
router.get("/:roomId", protect, getRoom);

module.exports = router;
