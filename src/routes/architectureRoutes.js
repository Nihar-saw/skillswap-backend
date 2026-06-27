const express =
require("express");

const router=
express.Router();

const{

analyzeArchitecture,

getArchitectureReview

}=require("../controllers/architectureController");

const{

protect

}=require("../middleware/authMiddleware");

router.post(

"/",

protect,

analyzeArchitecture

);

router.get(

"/:projectId",

protect,

getArchitectureReview

);

module.exports=router;