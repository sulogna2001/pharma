const mongoose = require("mongoose");


const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    role: {
        type: String,
        default: "seller",
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    }
});

module.exports = mongoose.model("seller", sellerSchema);
