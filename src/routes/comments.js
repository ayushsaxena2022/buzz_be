const mongoose = require('mongoose');
const express = require('express');
const router = require('express').Router();
const comment = require('../models/comment');
const myfeed = require('../models/myfeed');



//Create Comment

router.post('/comments/:feed_Id', async (req, res) => {
   try {
        const feed_Id = await myfeed.findOne({ _id: req.params.feed_Id });
        const comments = new comment();
        comments.comment = req.body.comment;
        comments.feed_Id = feed_Id._id;
        await comments.save();
        feed_Id.User.push(comments._id);
        await post.save();
        res.send(comments);

        
    }
   catch (err) {
       res.status(400).send(err);
   }

});

//Read Comment
router.get('/:feed_id', async (req, res) => {

    const feed_Id = await Feed.findOne({ _id: req.params.feed_id }).populate("User_Id");
    res.send(feed_Id);

});

//Update Comment
router.put('/api/comments/:feed_id', async (req, res) => {

    try {
        const comment = await comment.findOneAndUpdate({

            _id: req.params.feed_id,
        })
        req.body,
            { new: true }
        res.send(comment);
    }
    catch (err) {
        res.status(400).send(err);
    }

})

//Delete Comment
router.delete('/api/comments/:feed_id', async (req, res) => {

    const comment = await Comment.findByIdAndRemove(req.params.feed_id);
    if (!comment) return res.status(404).send('comments not added')
    res.send({ message: "comment Deleted" });

})

router.get('/api/comments/:feed_id', async (req, res) => {
    
    const comment = await Comment.findById(req.params.feed_id);
    if (!comment) return res.status(404).send('comments not found');
    res.send(comment);

});

module.exports = router;
