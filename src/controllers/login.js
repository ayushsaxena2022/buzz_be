require("dotenv").config();
const Users = require("../models/Users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



async function logindata(req, res, next)  {
    try {

        const email = req.body.email;
        const password = req.body.password;


        const user = await Users.findOne({ email });
        if (!user) {


            return res.status(401).send("User Not Found");



        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign(
                { _id: user._id, is_Admin: user.is_Admin },
                process.env.JWT_SECRET_KEY);
            return res.header("x-auth-token", token).status(201).send("Success");
        }
        res.status(401).send("Password Invalid");
    }
    catch (err) {

        return res.status(401).send("Error" + err);
    }
}

module.exports=logindata;