const express = require('express');
const router = express.Router();
const userRouter = require("./user.route.js");
const captainRouter = require("./captain.route.js");

router.use('/user', userRouter);
router.use('/captain', captainRouter);

module.exports = router;