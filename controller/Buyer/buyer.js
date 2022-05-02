const Buyers = require("../../models/buyer");
const { isValidObjectId } = require("mongoose");

const getBuyer = async (req, res) => {
  try {
    const decodedValue = req.user;
    console.log(decodedValue);

    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
  
    const id=decodedValue._id;
    console.log(id);

    if (!isValidObjectId(id)) {
      return res.status(403).json("Invalid User");
    }

    // console.log(id);

    const buyer = await Buyers.findOne({ _id:id });
    if (!buyer) return res.status(403).json("No Such User has Logged In");

    return res.status(200).json(buyer);

    // return res.status(200).json(buyer);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { getBuyer };
