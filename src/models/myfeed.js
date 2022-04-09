const mongoose = require('mongoose');
const feed = mongoose.model('Feed', new mongoose.Schema({

    User_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'commentSchema',
        required: true
    }],
    comment: {
        type: String,
        minlength: 5,
        maxlength: 10,
        required: true
    },
    updated_At: {
        type: Date, default: new Date()
    },
    created_At: {
        type: Date, default: new Date()
    }
}));

module.exports.Feed = feed;
