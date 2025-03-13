const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blockedUserSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId ,
    ref: 'Users',
    required: true
  }
}, {
  timestamps: true 
});

blockedUserSchema.index({ user_id: 1 }, { unique: true });

module.exports = mongoose.model('BlockedUser', blockedUserSchema);
