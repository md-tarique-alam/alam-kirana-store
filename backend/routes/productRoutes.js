const express = require("express");

const upload = require("../middleware/uploadMiddleware");

const router=express.Router();

const {getProduct, addProduct, deleteProduct, updateProduct, findProduct}=require("../controllers/productController")

const{authMiddleware, adminMiddleware}=require("../middleware/authMiddleware")

router.get("/", getProduct);

router.post("/", authMiddleware, adminMiddleware, upload.single("image"), addProduct);

router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

router.put("/:id", authMiddleware, adminMiddleware, updateProduct);

router.get("/:id", findProduct);

module.exports=router;