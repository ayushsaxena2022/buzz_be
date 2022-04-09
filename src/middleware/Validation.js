const Joi = require('joi');

//Joi Validation
function validateComment(comment) {
  const schema = {
    comment: Joi.string().min(5).max(10).required()
  };

  return Joi.validate(comment, schema);
}

module.exports.validate = validateComment; 
