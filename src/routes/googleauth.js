const router = require("express").Router();
require("../controllers/googleauth.js");
const passport = require("passport");
const Users = require("../models/users.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


router.get('/', passport.authenticate('google', {
    scope: ['profile', 'email']
}
));
router.get('/callback', passport.authenticate('google', { failureRedirect: '/auth/fail' }),
    async (req, res, next) => {
        try {
             const result = await Users.findOne({ email: req.user.profile._json.email });
            if (!result) {
                const user = new Users({
                    email: req.user.profile._json.email,
                    firstname: req.user.profile._json.given_name,
                    profile_img: req.user.profile._json.picture,
                    lastname: req.user.profile._json.family_name,
                     });
                   user.password=await bcrypt.hash(user.email,10);
                   await user.save();
                    const token = jwt.sign(
                    { _id: user._id, is_Admin: user.is_Admin },
                    process.env.JWT_SECRET_KEY);
                    res.cookies("jwtoken",token);
                return res.status(201).json({message:"Success"});
                 }
                const token = jwt.sign(
                { _id: result._id, is_Admin: result.is_Admin },
                process.env.JWT_SECRET_KEY);
                return res.status(201).json({message:"Success"});
                }   catch (err) {
                res.status(500).json({message:""+ err});
                }
                });
                router.get('/auth/fail', (req, res, next) => {
                res.status(401).json({message:"Unauthorized"});
                });

        module.exports = router;
        
