const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController"); 
const protectRoute = require("../middleware/protectRoute");
const validatePost = require("../middleware/validationMiddleware/postValidation");

const handleValidationErrors = require("../middleware/validationMiddleware/handleValidation");

router.route("/post")
    .post(protectRoute.protect,protectRoute.isVerified,validatePost.validatePost,handleValidationErrors,postController.addPost)
    .get(protectRoute.protect,protectRoute.isVerified,postController.getPostsOfUser);//for profile

router.route("/post/public")//for homepage
    .get(protectRoute.protect,protectRoute.isVerified,postController.getPublicPosts);

router.route("/post/filter")
    .get(protectRoute.protect,protectRoute.isVerified,postController.filterPosts);

router.route("/post/:id")
    .get(protectRoute.protect,protectRoute.isVerified,postController.getPostById)
    .put(protectRoute.protect,protectRoute.isVerified,validatePost.validatePost,handleValidationErrors,postController.updatePost)
    .delete(protectRoute.protect,protectRoute.isVerified,postController.deletePost);

module.exports = router;
