const router = require("express").Router();
const users = require("../models/users.js");
const mongoose = require("mongoose");

router.get("/:id", async (req,res)=>{
    try {
        const  userid =  req.params.id;
        // console.log(userid)
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(404).send(`Not a valid id: ${userid}`);
        }
        let user = await users.findById(userid);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json("No user with given id");
        }
    } catch (error) {
        res.status(400).json({ "message": "" + error });
    }
});


module.exports = router;