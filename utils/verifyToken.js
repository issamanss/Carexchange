const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.token_key); // Verify token
    } catch (error) {
        return null; // Return null if verification fails
    }
};

module.exports = verifyToken;