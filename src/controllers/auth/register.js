const Users = require("../../models/Users.js");
const bcrypt = require("bcryptjs");
const getAgeFromDob = require("../../utils/getAgeFromDob.js");


async function registerdata(req, res, next) {
    try {
         const user = new Users({
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            gender: req.body.gender,
            dob: req.body.dob
          });
         user.age = getAgeFromDob(user.dob);
         user.password = await bcrypt.hash(user.password, 10);
         await user.save();
         res.status(201).send("User registered Successfully");
    }
                       catch (err) {
                       if (err.code === 11000) {
                       return res.status(401).send("User already exists");
        }
                       res.status(401).send("Error" + err);
    }}
module.exports = registerdata;
