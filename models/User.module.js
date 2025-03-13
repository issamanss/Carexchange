const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user_roles = require('../utils/user_roles');

const otpSchema = new Schema({
  otp: {
    type: String, 
    default: null
  },
  otp_exp: {
    type: Date,
    deault: null
  }
});

const wishlistSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
});

const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [user_roles.ADMIN, user_roles.USER],
    default: user_roles.USER
  },
  otp: {
    type: otpSchema,
    default: () => ({ otp: null, otp_exp: null }) 
  },
  phoneNumber: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  wishlist: [wishlistSchema]
}, {
  timestamps: true 
});

module.exports = mongoose.model('Users', userSchema);
