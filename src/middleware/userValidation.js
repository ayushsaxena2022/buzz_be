const Joi = require("joi");



const registerSchema = Joi.object({
    gender: Joi.string().required().valid("Male", "Female"),
    password: Joi.string().required().min(8).max(15).pattern(new RegExp("(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#%])")),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    dob: Joi.date().required()


});

async function registerValidation(req, res, next) {
    try {
        await registerSchema.validateAsync({
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            password: req.body.password,
            gender: req.body.gender,
            dob: req.body.dob
        });
        next();
    } catch (err) {
        if (err.details[0].message.indexOf("password") !== -1) {
            return res.status(401).send(" Password  must be min 8 and max 15 characters long , have atleast one uppercase letter,number and a special character ");

        }
        return res.status(401).send("Error" + err);
    }
}
module.exports = registerValidation;
