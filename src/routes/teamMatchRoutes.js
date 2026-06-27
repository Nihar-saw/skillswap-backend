const express =
require("express");

const router =
express.Router();

const {
findTeam
}=require("../controllers/teamMatchController");

const {
protect
}=require("../middleware/authMiddleware");

router.post(
"/",
protect,
findTeam
);

module.exports=router;