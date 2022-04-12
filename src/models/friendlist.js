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

  followers: [{
    type: mongoose.Schema.Types.ObjectId,

  }],

  following: [{
    type: mongoose.Schema.Types.ObjectId,
  }],

  username: {

    type: String,

  },

  status: "active"

}, {
  timestamps: true,
}));

module.exports.Friend = Friends;
