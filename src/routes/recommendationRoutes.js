const express =
require("express");

const router=
express.Router();

const{

createRecommendations,

getRecommendations

}=require("../controllers/recommendationController");

const{

protect

}=require("../middleware/authMiddleware");

router.post(

"/",

protect,

createRecommendations

);

router.get(

"/:projectId",

protect,

getRecommendations

);

module.exports=router;