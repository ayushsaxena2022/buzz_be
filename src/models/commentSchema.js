const mongoose = require('mongoose');
const Comments = mongoose.model('Comment', new mongoose.Schema({

  comment: {
    type: String,
    minlength: 5,
    maxlength: 10,
    required: true
  },
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  feed_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feed',
    required: true
  },
  updated_At: {
    type: Date, default: new Date()
  },
  created_At: {
    type: Date, default: new Date()
  }
}));

module.exports.Comment = Comments;
