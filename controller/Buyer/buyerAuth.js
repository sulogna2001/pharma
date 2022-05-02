const buyer = require ( "../../models/buyer" );
const bcrypt = require ( "bcryptjs");
const jwt = require ("jsonwebtoken");


 const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const existingBuyer = await buyer.findOne({ email });

    if (existingBuyer) {
      return res.status(400).json({ message: "Buyer already exists" });
    }

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newBuyer = await buyer.create({
      name,
      password: hashedPassword,
      email,
    });
    const token = jwt.sign(
      { name: newBuyer.name, email: newBuyer.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ newBuyer: newBuyer, token: token, message: "Buyer added" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
 const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingBuyer = await buyer.findOne({ email });
    if (!existingBuyer)
      return res.status(404).json({ message: "Buyer doesnot exists" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingBuyer.password
    );
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid creadentials!" });
    }
    const token = jwt.sign(
      { name: existingBuyer.name, email: existingBuyer.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      newBuyer: existingBuyer,
      token: token,
      message: "Logged in succussfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { login,signup };