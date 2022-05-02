const mongoose = require("mongoose");


const buyerSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
      },
      role: {
        type: String,
        default: "buyer"
      },
      password: {
        type: String,
        required: true,
        min: 3,
      },
      email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
      }
    },
    { timestamps: true }
  );

module.exports = mongoose.model("buyer", buyerSchema);
