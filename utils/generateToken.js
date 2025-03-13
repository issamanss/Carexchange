const jwt = require("jsonwebtoken");

module.exports = async (payload)=>{
    const token = await jwt.sign(payload,process.env.token_KEY,{expiresIn:"18hr"});
    return token;
}