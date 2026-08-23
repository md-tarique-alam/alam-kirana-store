const express=require("express");
const { authMiddleware ,adminMiddleware } = require("../middleware/authMiddleware");
const router=express.Router();
const {getmyorders, allorders, createorders, cancelorder, orderstatus, }=require("../controllers/orderController")

router.get("/my-orders", authMiddleware, getmyorders);

router.get("/", authMiddleware, adminMiddleware, allorders);

router.post("/", authMiddleware, createorders );

router.patch("/:id/cancel" , authMiddleware, cancelorder);

router.patch("/:id/status", authMiddleware, adminMiddleware, orderstatus);

module.exports=router