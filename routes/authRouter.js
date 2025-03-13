const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import auth functions
const { validateUserSignup, validateUserSignin } = require('../middleware/validationMiddleware/userValidation'); // Import validation
router.route('/')
    .get(authController.getLoginPage)
    .post(validateUserSignin,authController.signin);
router.route('/register')
    .post(validateUserSignup,authController.signup);

module.exports = router;
