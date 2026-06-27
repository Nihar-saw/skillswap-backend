const express =
require("express");

const router=
express.Router();

const {
connectGithub
}=require("../controllers/githubController");

const {
protect
}=require("../middleware/authMiddleware");

router.post(
"/connect",
protect,
connectGithub
);

module.exports=
router;