const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

//routes
const sellerAuthRoute = require("./routes/Authroutes/sellerAuthRoute");
const buyerAuthRoute = require("./routes/Authroutes/buyerAuthRoute");
const buyer = require("./routes/Buyer");
const seller=require("./routes/Seller");

dotenv.config();
app.use(cors());

const port = process.env.PORT || 5000;
const URL = process.env.MONGODB_URL;
mongoose.connect(
  
  "mongodb+srv://sulogna:8eaguTqlTIXBbkfB@cluster0.1e6nm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Database");
  }
);

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));

app.use("/auth/seller", sellerAuthRoute);
app.use("/auth/buyer", buyerAuthRoute);

app.use("/buyer", buyer);
app.use("/seller",seller);

app.listen(port, () => {
  console.log("Server is running");
});

app.get("/", (req, res) => {
  res.send("Welcome to Pharma api!");
});
