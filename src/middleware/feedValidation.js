const Joi = require("joi");

const feedSchema = Joi.object({
  text: Joi.string().min(5),
  createdBy: Joi.string().required(),
});

async function feedValidation(req, res, next) {
  try {
    await feedSchema.validateAsync({
      text: req.body.text,
      createdBy: req.body.createdBy,
    });
    next();
  } catch (err) {
    return res.status(401).send("" + err);
  }
}
module.exports = feedValidation;

