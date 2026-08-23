const mongoose = require("mongoose");

const order = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        },
        name: String,
        price: Number,
        quantity: Number,
    }],
    address: {
        name: String,
        address: String,
        city: String,
        pincode: String,
        landmark: String,
        mobilenumber: String,
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["placed",
            "confirmed",
            "out-for-delivery",
            "delivered",
            "cancelled"],
        default: "placed"
    },
    paymentmethod: {
        type: String,
        enum: ["Cash-on-delivery", "upi-on-delivery"],
        default: "Cash-on-delivery"
    }

}, {
    timestamps: true,
})

module.exports = mongoose.model("order", order);