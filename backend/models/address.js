const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        rquired: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    city: {
        type: String,
        required: true,
        trim: true
    },

    pincode: {
        type: String,
        required: true,
        trim: true
    },

    landmark: {
        type: String,
        trim: true
    },

    mobilenumber: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("Address", addressSchema);