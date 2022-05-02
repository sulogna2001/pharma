const mongoose = require("mongoose");


const ordersSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seller"
    },
    customerName: {
        type: String
    },
    products: [{
        productId: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        name: String,
        price: Number,
        img: String,
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    },
    
    orderDetails: {
        type: Array
    },
    quantity: {
        type: Number
    },
    buyer: Array
});

module.exports = mongoose.model("order", ordersSchema);
