const express = require('express');
const { verify_otp, send_otp } = require('../controllers/otpController');
const protectRoute = require('../middleware/protectRoute');
const router = express.Router();

router.route('/')
    .get(protectRoute.protect, send_otp)
    .post(protectRoute.protect, verify_otp);


module.exports = router;
