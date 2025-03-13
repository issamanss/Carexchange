const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const postController = require("../controllers/postController"); 
const protectRoute = require("../middleware/protectRoute");
const validatePost = require("../middleware/validationMiddleware/postValidation");

const { protect, adminOnly } = require('../middleware/protectRoute'); 
router.route('/')
    .get(protect,adminOnly,adminController.getadminPage)
    

router.route('/post')
        .get(protectRoute.protect,protectRoute.adminOnly, postController.getAllPosts);

router.route("/post/:id/visibility")
    .patch(protectRoute.protect,protectRoute.adminOnly,postController.changePostVisibility);


module.exports = router;
