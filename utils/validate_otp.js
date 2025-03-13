const validate_otp = (otp, isotp) => {
    if (!otp || !otp.otp_exp || !otp.otp) return false; 

    if (otp.otp_exp < Date.now()) {
        return false; 
    }
    
    return otp.otp === isotp; 
};

module.exports = validate_otp;