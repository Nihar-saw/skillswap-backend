const express =
require("express");

const router=
express.Router();

const {
analyze
}=require("../controllers/startupAIController");

const {
protect
}=require("../middleware/authMiddleware");

router.post(
"/analyze",
protect,
analyze
);

module.exports=
router;