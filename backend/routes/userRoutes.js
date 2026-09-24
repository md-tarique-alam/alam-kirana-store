const express=require("express");

const {signup, login, logout, getUser, findUser , userProfile, updateProfile, forgotPassword, resetPassword}=require("../controllers/userController");

const {authMiddleware, adminMiddleware}=require("../middleware/authMiddleware");

const router=express.Router();

router.post("/signup", signup)
 
router.post("/login" , login)

router.post("/logout", authMiddleware, logout)

router.get("/me" ,authMiddleware, getUser)

router.get("/", authMiddleware, adminMiddleware, findUser)

router.get("/profile" ,authMiddleware, userProfile)

router.patch("/update" ,authMiddleware, updateProfile)

router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token", resetPassword)
    
module.exports=router;