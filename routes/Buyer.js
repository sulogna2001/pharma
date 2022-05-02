const {getBuyer} = require ("../controller/Buyer/buyer");

const {verifyJWT} = require ("../middlewares/jwtAuth");
const router = require("express").Router();


router.get("/profile",verifyJWT, getBuyer);

module.exports = router;