const users = require("../models/users.js");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

exports.viewUserProfile = async (req, res, next) => {
    try {
        const { userid } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(404).send(`Not a valid id: ${userid}`);
        }
        let user = await users.findById(userid);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json("No user with given id");
        }
    } catch (err) {
        next(err);
    }
};
exports.updateUserProfile = async (req, res, next) => {
    try {
        let result;
        const { userid, firstname, lastname, gender, city, state, country, dob } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(404).send(`Not a valid id: ${userid}`);
        }
        let user = await users.findById(userid);
        if (user) {
            // Delete image from cloudinary
            if (req.file) {
                // console.log(result)
                user.profile_img_cloudinary_id &&
                    (await cloudinary.uploader.destroy(user.profile_img_cloudinary_id));
                // // Upload image to cloudinary
                result = await cloudinary.uploader.upload(req.file.path, { folder: 'usersProfileImages' });
            }
        } else {
            res.status(404).json("No user with given id");
        }
        const userUpdatedData = {
            email: user.email,
            password: user.password,
            firstname: firstname || user.firstname,
            lastname: lastname || user.lastname,
            gender: gender || user.gender,
            city: city || user.city,
            state: state || user.state,
            country: country || user.country,
            dob: dob || user.dob,
            profile_img: result?.secure_url || user.profile_img,
            profile_img_cloudinary_id: result?.public_id || user.profile_img_cloudinary_id,

        };
        updatedUser = await users.findByIdAndUpdate(userid, userUpdatedData, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).send("error" + err);
    }
};

