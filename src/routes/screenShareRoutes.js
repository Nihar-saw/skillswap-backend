const express =
require("express");

const router=
express.Router();

const{

start,

stop

}=require("../controllers/screenShareController");

const{

protect

}=require("../middleware/authMiddleware");

router.post(
"/start",
protect,
start
);

router.put(
"/stop",
protect,
stop
);

module.exports=
router;