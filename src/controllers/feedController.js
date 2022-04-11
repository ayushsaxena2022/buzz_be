const Feed = require("../models/feed");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

exports.createFeed = async (req, res) => {
  const { createdBy, text } = req.body;
  try {
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    //instance of post
    const data = {
      createdBy: createdBy,
      text: text,
      status: "active",
      imgLink: result?.secure_url || "",
      cloudinaryId: result?.public_id || "",
    };
    let feed = new Feed(data);
    //saving post
    await feed.save();
    res.status(201).json(feed);
  } catch (error) {
    res.status(401).send("error" + error);
  }
};

exports.getFeeds = async (req, res) => {
  try {
    let feeds = await Feed.find({});
    res.status(200).json(feeds);
  } catch (error) {
    res.status(400).send("error" + error);
  }
};

exports.deleteFeed = async (req, res, next) => {
  try {
    //valid object id check

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Not a valid id: ${id}`);

    //post find
    let feed = await Feed.findById(id);
    //delete from cloudinary
    if (feed) {
      feed.cloudinaryId &&
        (await cloudinary.uploader.destroy(feed.cloudinaryId));
      //delete post from db
      await feed.remove();
      res.json(feed);
    } else {
      res.status(404).json("No post with given id");
    }
  } catch (error) {
    next(error);
  }
};

exports.updateFeed = async (req, res, next) => {
  try {
    let result;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`Not a valid id: ${id}`);
    }
    let feed = await Feed.findById(id);
    if (feed) {
      // console.log(req.file)
      // // Delete image from cloudinary
      if (req.file) {
        feed.cloudinaryId &&
          (await cloudinary.uploader.destroy(feed.cloudinaryId));
        // // Upload image to cloudinary
        result = await cloudinary.uploader.upload(req.file.path);
      }
    } else {
      res.status(404).json("No post with given id");
    }
    const data = {
      imgLink: result?.secure_url || feed.imgLink,
      cloudinaryId: result?.public_id || feed.cloudinaryId,
      text: req.body.text,
    };
    feed = await Feed.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(feed);
  } catch (err) {
    next(err);
  }
};
exports.likeFeed = async (req, res, next) => {
  try {
    //getting ids
    const feedid = req.params.id;
    const userid = req.body.uid;
    //validating 
    if (!mongoose.Types.ObjectId.isValid(feedid)) return res.status(404).send(`Not a valid id: ${feedid}`);
    //finding in db
    let feed = await Feed.findById(feedid);

    if (feed) {
      //checking for existence of id 
      const index = userid && feed.likeCount.findIndex((id) => id === userid);

      if (index === -1) {
        feed.likeCount.push(userid);        //pushing if id not present
      } else {
        feed.likeCount = feed.likeCount.filter((id) => id !== userid); //removing if id is present
      }
      //updation in database
      const updatedFeed = await Feed.findByIdAndUpdate(feedid, feed, { new: true });

      res.status(200).json(updatedFeed);
    } else
      res.status(404).json("No post with given id");
  }
  catch (error) {
    res.status(400).send("error" + error);
  }

}
exports.flagFeed = async (req, res, next) => {
  try {
    //getting ids
    const feedid = req.params.id;
    const userid = req.body.uid;
    //validating 
    if (!mongoose.Types.ObjectId.isValid(feedid)) return res.status(404).send(`Not a valid id: ${feedid}`);
    //finding in db
    let feed = await Feed.findById(feedid);

    if (feed && feed.createdBy !== userid) {
      //checking for existence of id 
      const index = userid && feed.flagCount.findIndex((id) => id === userid);

      if (index === -1) {
        feed.flagCount.push(userid);        //pushing if id not present
      } else {
        feed.flagCount = feed.flagCount.filter((id) => id !== userid); //removing if id is present
      }
      //updation in database
      const updatedFeed = await Feed.findByIdAndUpdate(feedid, feed, { new: true });

      res.status(200).json(updatedFeed);
    } else
      res.status(404).json("No post with given id");
  }
  catch (error) {
    res.status(400).send("error" + error);
  }
}