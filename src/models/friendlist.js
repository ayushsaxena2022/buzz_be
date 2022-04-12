const mongoose = require('mongoose');
const Friends = mongoose.model('Friend', new mongoose.Schema({

  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  friend: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  username: {

    type: String,

  },

}, {
  timestamps: true,
}));

module.exports.Friend = Friends;
