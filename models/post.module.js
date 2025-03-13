const mongoose = require("mongoose");
const AddressSchema = require("./Address.module");
const CarSchema = require("./Car.module");
const post_visibility = require("../utils/post_visibility");

const PostSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: AddressSchema, 
    car: CarSchema, 
    pictures: [{ type: String }],
    visibility: { type: String, enum: [post_visibility.public, post_visibility.private], default: post_visibility.public } // Add visibility field
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
