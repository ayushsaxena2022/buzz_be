const mongoose = require('mongoose');
const Comments = new mongoose.Schema({

  comment: {
    type: String,
    minlength: 5,
  },
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  feed_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'myfeed',
  },
  updated_At: {
    type: Date, default: new Date()
  },
  created_At: {
    type: Date, default: new Date()
  }
});

module.exports = mongoose.model("comment", Comments);;
