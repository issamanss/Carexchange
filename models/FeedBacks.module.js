const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: {
    type: String,
    required: true,
    minlength: [10, 'Message must be at least 10 characters long'],
    maxlength: [300, 'Message must be less than 300 characters'],
  },
}, {
  timestamps: true, 
});
feedbackSchema.index({ user_id: 1 });
module.exports = mongoose.model('Feedback', feedbackSchema);
