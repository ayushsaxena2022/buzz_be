const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");
const Feed = require("../models/feed")

async function Moderatorcontroller(req, res) {
    try {
        if (!req.user.is_Admin)
            return res.status(401).json({ message: "Only Admins can delete posts" });

        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: `Not a valid id: ${id}` });
        let feed = await Feed.findById(id);
        if (feed) {
            feed.cloudinaryId &&
                (await cloudinary.uploader.destroy(feed.cloudinaryId));
            //delete post from db
            await feed.remove();
            res.status(200).json({ message: "Post deleted", data: feed });
        } else
            res.status(401).json({ message: "Feed not found" });
        } catch (err) {
        res.status(400).json({ message: " " + err });
    }
}
module.exports = Moderatorcontroller;