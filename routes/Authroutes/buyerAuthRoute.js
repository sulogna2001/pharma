const { signup,login } = require ("../../controller/Buyer/buyerAuth");

const router = require("express").Router();

router.post("/signup",signup);
router.post("/login",login);
module.exports = router