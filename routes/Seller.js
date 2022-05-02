const {getSeller} = require ("../controller/Seller/seller");


const {verifyJWT} = require ("../middlewares/jwtAuth");
const router = require("express").Router();

router.get("/profile",verifyJWT , getSeller);

module.exports = router;