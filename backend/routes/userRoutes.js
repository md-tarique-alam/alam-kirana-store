const express=require("express");

const {signup, login, logout, getUser}=require("../controllers/userController");

const {authMiddleware}=require("../middleware/authMiddleware");

const router=express.Router();

router.post("/signup", signup)
 
router.post("/login" , login)

router.post("/logout", authMiddleware, logout)

router.get("/me" ,authMiddleware, getUser)
    
module.exports=router;