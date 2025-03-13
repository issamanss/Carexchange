const User = require('../models/User.module');
const verifyToken = require('../utils/verifyToken');
const user_roles = require('../utils/user_roles');

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        token = token.split(' ')[1];

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token verification failed' });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== user_roles.ADMIN) {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
};

const isVerified = (req, res, next) => {
    if (!req.user.isVerified) {
        return res.status(403).json({ message: 'Access denied: User is not verified' });
    }
    next();
};

module.exports = { protect, adminOnly, isVerified };