const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  posts_id: {
    type: Schema.Types.ObjectId,
    ref: 'Posts',
    required: true,
  },
}, {
  timestamps: true, 
});
feedbackSchema.index({ user_id: 1 });
module.exports = mongoose.model('Feedback', feedbackSchema);
