const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"]
    },
    manufacturerName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: [true, "Please enter product Quantity"]
    },
    discount: {
        type: Number
    },
    
    
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seller"
    },
});

module.exports = mongoose.model("medicine", medicineSchema);
