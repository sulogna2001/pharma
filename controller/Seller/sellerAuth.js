const seller = require("../../models/seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const existingSeller = await seller.findOne({ email });

    if (existingSeller) {
      return res.status(400).json({ message: "Seller already exists" });
    }

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newSeller = await seller.create({
      name,
      password: hashedPassword,
      email,
    });
    const token = jwt.sign(
      { name: newSeller.name, email: newSeller.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ newSeller: newSeller, token: token, message: "Seller added" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingSeller = await seller.findOne({ email });
    if (!existingSeller)
      return res.status(404).json({ message: "Seller doesnot exists" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingSeller.password
    );
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid creadentials!" });
    }
    const token = jwt.sign(
      { name: existingSeller.name, email: existingSeller.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      newSeller: existingSeller,
      token: token,
      message: "Logged in succussfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { signup, login };
