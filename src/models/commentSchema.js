const mongoose = require('mongoose');
const Comment = mongoose.model('Comment', new mongoose.Schema({

    comment: {
      type: String, 
      minlength: 2, 
      maxlength: 500, 
      required: true},        
    user_Id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'}, 
    feed_Id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Feed'},
    updated_At: {
      type: Date, default: new Date()},
    created_At: {
      type: Date, default: new Date()} 


}));

module.exports.Comment = Comment;





