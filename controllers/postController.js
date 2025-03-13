const Post = require("../models/post.module");
const { validationResult } = require("express-validator");
const UserModule = require("../models/User.module");
const roles = require("../utils/user_roles");
const post_visibility = require("../utils/post_visibility");

const addPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const data = req.body;
        
        const post = new Post({
            user_id: req.user._id, 
           ...data,
        });

        await post.save();
        res.status(201).json({ message: "Post created successfully!", post });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getPostsOfUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const posts = await Post.find({ user_id: userId });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getPublicPosts = async (req, res) => {
    console.log("req.user", req.user);
    try {
        const userId = req.user._id;
        console.log("userId", userId);
        const posts = await Post.find({ 
            visibility: post_visibility.public, 
            user_id: { $ne: userId }
        })

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if(req.user.role !== roles.ADMIN){
            if (post.user_id.toString() !== req.user.id) {
                return res.status(403).json({ message: "You are not authorized to delete this post" });
            }
        }
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if(req.user.role !== roles.ADMIN){
       
            if (post.user_id.toString() !== req.user.id) {
                return res.status(403).json({ message: "You are not authorized to update this post" });
            }
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({ message: "Post updated successfully!", updatedPost });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const changePostVisibility = async (req, res) => {
    try {
        const { visibility } = req.body;

        if (![post_visibility.public, post_visibility.private].includes(visibility)) {
            return res.status(400).json({ message: "Invalid visibility option" });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        post.visibility = visibility;
        await post.save();

        res.status(200).json({ message: `Post visibility changed to ${visibility}!`, post });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const filterPosts = async (req, res) => {
    try {
        let filters = { visibility: post_visibility.public };

        const { brand, category, color, year, minPrice, maxPrice, minMiles, maxMiles } = req.query;

        if (brand) filters["car.brand"] = brand;
        if (category) filters["car.category"] = category;
        if (color) filters["car.color"] = color;
        if (year) filters["car.year"] = year;
        if (minPrice || maxPrice) {
            filters["car.price"] = {};
            if (minPrice) filters["car.price"].$gte = Number(minPrice);
            if (maxPrice) filters["car.price"].$lte = Number(maxPrice);
        }
        if (minMiles || maxMiles) {
            filters["car.miles"] = {};
            if (minMiles) filters["car.miles"].$gte = Number(minMiles);
            if (maxMiles) filters["car.miles"].$lte = Number(maxMiles);
        }

        const posts = await Post.find(filters);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    addPost,
    getAllPosts,
    getPostsOfUser,
    getPublicPosts,
    getPostById,
    deletePost,
    updatePost,
    changePostVisibility,
    filterPosts,
};
