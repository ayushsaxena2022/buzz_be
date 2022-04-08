const express = require('express');
const router = require('express').Router();
const validation = require('../middleware/Validation');
const Joi = require('joi');
const commentController = require('../controllers/commentController');
const commentMiddleware = require('../middleware/commentMiddleware')


router.post('/api/comments/:id', async (req, res) => {

    const {error}  = validateComment(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let User = await Comment.findById(req.body.user_id);
    if(!User) return res.status(400).send('Invalid Id');
    let Feed = await Comment.findById(req.body.user_id);
    if(!Feed) return res.status(400).send('Invalid Id');
    console.log(req.User);
    console.log(req.Feed);
    let comment = new Comment ({
     comment: req.body.comment, 
     User:  req.User._id,
     Feed: req.Feed._id
    })
try {

const comment = await comment.save();
const  comments = await Comment.findById(comment._id).populate('user');
res.send(comments);
  }
  catch(err){
      res.status(400).send(err);
  }
  
});

router.get('/api/comments', async (req, res)  => {

    const comments = await Comment.find()
    .populate('User')
    .populate('Feed')
    .sort({'created_At': -1})
    .sort({'updated_At': 1})
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error' + err));

})


router.put('/api/comments/:id', async (req, res) => {

    console.log(req.user);
    try{
        await Comment.findByIdAndUpdate(req.body._id);
        res.send({"success": true});
    }
    catch(err) {
        res.status(400).send(err);
    }

})

router.delete('/api/comments/:id', async (req, res) => {

     const comment = await Comment.findByIdAndRemove(req.params.id);

     if(!comment) return res.status(404).send('comments not added')
     res.send(comment);

})

router.get('/api/comments/:id', async (req, res) => {
   const comment = await Comment.findById(req.params.id);
   if(!comment) return res.status(404).send('comments not found');
   res.send(comment);

});


module.exports = router;

