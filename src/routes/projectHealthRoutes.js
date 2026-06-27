const express=
require("express");

const router=
express.Router();

const{

analyzeHealth,

getHealth

}=require("../controllers/projectHealthController");

const{

protect

}=require("../middleware/authMiddleware");

router.post(

"/",

protect,

analyzeHealth

);

router.get(

"/:projectId",

protect,

getHealth

);

module.exports=router;