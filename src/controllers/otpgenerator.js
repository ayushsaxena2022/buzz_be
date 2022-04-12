const Users = require("../models/users");
const generateOtp = require("../utils/generateotp");
const mailgenerator = require("../utils/mailgenerator");


async function otpGenerator(req, res) {
    try {
        const { email } = req.body;
        const result = await Users.findOne({ email });
        if (!result)
            return res.status(401).json({ message: "User not found" });
        const otp = await generateOtp(email);
        if (!otp)
            res.status(401).send("Something went wrong");
        const state = await mailgenerator(email, otp);
        if (!state)
            return res.status(400).json({ message: "Something went wrong while sending email" });
        return res.status(201).json({ message: "Email sent successfully" });
    }
    catch (err) {
        res.status(401).json({ message: "" + err });
    }
}
module.exports = otpGenerator;
