const mongoose = require('mongoose');
const express = require('express');
const router = require('express').Router();
const commentSchema = require('../models/commentSchema');
const Feed = require('../models/myfeed');



//Create Comment
router.post('/:feed_id', async (req, res) => {

    try {
        const feed_Id = await Feed.findOne({ _id: req.params.feed_id });
        const comment = new commentSchema();
        comment.comment = req.body.comment;
        comment.feed_Id = feed_Id._id;
        await comment.save();
        res.send('hello');
        // feed_Id.commentSchema.push(comment._id);
        // await post.save();
        
    }
    catch (err) {
        res.status(400).send(err);
    }

});
//Read Comment
router.get('/:id', async (req, res) => {

    const feed_Id = await Feed.findOne({ _id: req.params.id }).populate("user_Id");
    res.send(feed_Id);

})
//Update Comment
router.put('/api/comments/:id', async (req, res) => {

    try {
        const comment = await comment.findOneAndUpdate({

            _id: req.params.id,
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
router.delete('/api/comments/:id', async (req, res) => {

    const comment = await Comment.findByIdAndRemove(req.params.id);
    if (!comment) return res.status(404).send('comments not added')
    res.send({ message: "comment Deleted" });

})

router.get('/api/comments/:feed_id', async (req, res) => {
    
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).send('comments not found');
    res.send(comment);

});

module.exports = router;
