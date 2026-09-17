const express=require("express");

const {signup, login, logout, getUser, findUser , userProfile, updateProfile}=require("../controllers/userController");

const {authMiddleware, adminMiddleware}=require("../middleware/authMiddleware");

const router=express.Router();

router.post("/signup", signup)
 
router.post("/login" , login)

router.post("/logout", authMiddleware, logout)

router.get("/me" ,authMiddleware, getUser)

router.get("/", authMiddleware, adminMiddleware, findUser)

router.get("/profile" ,authMiddleware, userProfile)

router.patch("/update" ,authMiddleware, updateProfile)
    
module.exports=router;