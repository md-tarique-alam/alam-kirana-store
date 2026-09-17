const express=require("express");
const router=express.Router();

const {getAddress , addAddress, updateAddress, deleteAddress}=require("../controllers/addressController")

const {authMiddleware}= require("../middleware/authMiddleware");

router.get("/" , authMiddleware , getAddress);

router.post("/add", authMiddleware, addAddress);

router.patch("/:id/update", authMiddleware, updateAddress);

router.delete("/:id/delete", authMiddleware, deleteAddress);

module.exports=router;