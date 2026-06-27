const express=
require("express");

const router=
express.Router();

const{

createCodeSession,

createNewFile,

save

}=require("../controllers/codeController");

const{

protect

}=require("../middleware/authMiddleware");

router.post(

"/session",

protect,

createCodeSession

);

router.post(

"/file",

protect,

createNewFile

);

router.put(

"/save/:id",

protect,

save

);

module.exports=
router;