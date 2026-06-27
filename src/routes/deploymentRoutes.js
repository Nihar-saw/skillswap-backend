const express =
require("express");

const router=
express.Router();

const{
analyze,
getReview
}=require("../controllers/deploymentController");

const{
protect
}=require("../middleware/authMiddleware");

router.post(
"/",
protect,
analyze
);

router.get(
"/:projectId",
protect,
getReview
);

module.exports=
router;