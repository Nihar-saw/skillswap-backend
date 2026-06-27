const express=
require("express");

const router=
express.Router();

const{
createRoom,
getRoom
}=require("../controllers/meetingController");

const{
protect
}=require("../middleware/authMiddleware");

router.post(
"/",
protect,
createRoom
);

router.get(
"/:roomId",
protect,
getRoom
);

module.exports=
router;