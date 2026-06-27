const express =
require("express");

const router=
express.Router();

const{

save,

load

}=require("../controllers/whiteboardController");

const{

protect

}=require("../middleware/authMiddleware");

router.post(

"/save",

protect,

save

);

router.get(

"/:roomId",

protect,

load

);

module.exports=
router;