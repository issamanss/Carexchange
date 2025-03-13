/*const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController"); 
const protectRoute = require("../middleware/protectRoute");
const validatePost = require("../middleware/validationMiddleware/postValidation");

const handleValidationErrors = require("../middleware/validationMiddleware/handleValidation");

router.route("/")
    .post(protectRoute.protect,protectRoute.isVerified,validatePost.validatePost,handleValidationErrors,postController.addPost)
    .get(protectRoute.protect,protectRoute.adminOnly, postController.getAllPosts);

router.route("/public")
    .get(protectRoute.protect,protectRoute.isVerified,postController.getPublicPosts);

router.route("/my-posts")
    .get(protectRoute.protect,protectRoute.isVerified,postController.getPostsOfUser);

router.route("/filter")
    .get(protectRoute.protect,protectRoute.isVerified,postController.filterPosts);

router.route("/:id")
    .get(protectRoute.protect,protectRoute.isVerified,postController.getPostById)
    .put(protectRoute.protect,protectRoute.isVerified,validatePost.validatePost,handleValidationErrors,postController.updatePost)
    .delete(protectRoute.protect,protectRoute.isVerified,postController.deletePost);

router.route("/:id/visibility")
    .patch(protectRoute.protect,protectRoute.adminOnly,postController.changePostVisibility);

module.exports = router;*/
