const express =
require("express");

const router=
express.Router();

const{

analyzeWorkload,

getWorkload

}=require("../controllers/workloadController");

const{

protect

}=require("../middleware/authMiddleware");

router.post(

"/",

protect,

analyzeWorkload

);

router.get(

"/:projectId",

protect,

getWorkload

);

module.exports=router;