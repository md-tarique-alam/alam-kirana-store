require("dotenv").config();

const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const productRoutes = require("./routes/productRoutes")

const userRoutes = require("./routes/userRoutes");

const orderRoutes=require("./routes/orderRoutes")

const express = require("express");

const mongoose = require("mongoose");

const cookieParser = require("cookie-parser")

console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });

const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use("/products", productRoutes)

app.use("/users", userRoutes)

app.use("/orders", orderRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000");
});