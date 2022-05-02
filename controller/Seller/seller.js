const Sellers = require("../../models/buyer");
const { isValidObjectId } = require("mongoose");

const getSeller = async (req, res) => {
  try {
    const decodedValue = req.user;
    // console.log(decodedValue);

    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue._id;

    if (!isValidObjectId(id)) {
      return res.status(403).json("Invalid User");
    }
    console.log(id);

    const seller = await Sellers.findOne({ _id: id });
    if (!seller) return res.status(403).json("No Such User has Logged In");

    // return res.status(200).json(req.user);

    return res.status(200).json(seller);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { getSeller };
