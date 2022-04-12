const jwt = require("jsonwebtoken");
const User = require("../models/users");

async function Authenticate(req, res, next) {
    try {
        const token = req.cookies.jwtoken;
        if (!token)
            res.redirect("http://localhost:3000/login")
        const verifytoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const rootuser = await User.findOne({ _id: verifytoken._id, is_Admin: verifytoken.is_Admin });
        if (!rootuser)
            throw new Error("No User Found")
        req.user = rootuser;
        req.user_id = rootuser._id;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "" + err });
    }
}
module.exports = Authenticate;
