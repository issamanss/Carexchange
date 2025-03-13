const validate_otp = require('../utils/validate_otp');
const generate_otp = require('../utils/generate_otp');
const send_otp_fn = require('../utils/send_otp');
const User = require('../models/User.module');

const verify_otp = async (req, res) => {
    try {
        const { otp } = req.body;
        let user = req.user;

        if(user.isVerified) {
            return  res.redirect('/home');
        }

        if (!user.otp) {
            return res.status(400).json({ message: 'No OTP found for this user.' });
        }
        let isOtpValid = validate_otp(user.otp, otp);
        if (!isOtpValid) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }
        let u_user = await User.findById(user._id);
        if (!u_user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        u_user.isVerified = true;
        await u_user.save();
        res.status(200).json({ message: 'OTP verified successfully', valid: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error while verifying OTP.' });
    }
};

const send_otp = async (req, res) => {
    try {
        let user = req.user;
        if(user.isVerified) {
          return  res.redirect('/home');
        }
        if (!user.otp) {
            user.otp = { otp: null, otp_exp: null }; 
        }
        if (user.otp.otp_exp && new Date(user.otp.otp_exp).getTime() > new Date().getTime()) {
            return res.status(400).json({ message: 'OTP is still valid.' });
        }

        const otp = generate_otp();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 
        let u_user = await User.findById(user._id);
        if (!u_user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        u_user.otp = { otp, otp_exp: otpExpiry };
        await u_user.save();
        await send_otp_fn(user.email, otp);
        return res.status(200).json({ message: "New OTP sent to your email.", email: user.email });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error while sending OTP.' });
    }
};

module.exports = { verify_otp, send_otp };
