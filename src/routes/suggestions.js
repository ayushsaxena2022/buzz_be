const router = require("express").Router();
const User = require("../models/users");

router.get("/", async (req, res) => {
        try {
        const users = await User.find({}).select("firstname lastname profile_img").sort({ firstname: 1 });
        res.status(200).json(users);
        } catch (err) {
        res.status(400).json({ message: " " + err });
        }});

module.exports = router;
