const Joi = require("@hapi/joi");
// const Joi = require('joi');

const catchAsync = require('../utils/catchAsync')


exports.eduValidator = catchAsync ( async (req, res, next) =>{
  
  const schema = Joi.object({
    school: Joi.string().alphanum()
      .min(3)
      .max(30)
      .required(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    degree: Joi.string(),
    areaOfStudy: Joi.string(),
    description: Joi.string()
  })
  const { body } = req;
  console.log(body)
  schema.validate(body)
  next()

});

