const mongoose = require('mongoose');
const Friend = mongoose.model('Friend', new mongoose.Schema({

  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  friend_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Friend'
  },
  status: "active"
}, {
  timestamps: true,

}));

module.exports.Friend = Friend;
