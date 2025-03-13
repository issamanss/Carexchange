const { body } = require('express-validator');

const validateUserSignup = [
    body('user_name')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 6, max: 14 }).withMessage('Username must be between 6 and 14 characters'),
    
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 22 }).withMessage('Name must be between 2 and 22 characters'),

    body('email')
        .isEmail().withMessage('Invalid email'),

    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    body('phoneNumber')
        .notEmpty().withMessage('Phone number is required')
        .isLength({ min: 8, max: 8 }).withMessage('Phone number must be exactly 8 characters')
];

const validateUserSignin = [
    body('user_name')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 6, max: 14 }).withMessage('Username must be between 6 and 14 characters'),

    body('password')
        .notEmpty().withMessage('Password is required')
];

module.exports = { validateUserSignup, validateUserSignin };
