const Joi = require('joi'); // vou fazer com joi para treinar. Me parece mais simples, para essa validação, do que fazer de outra forma

const comprasDTO = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().required(),
    image: Joi.string().required(),
    saldo: Joi.number().positive().required(),
}).messages({
  'any.required': '400-{{#label}} is required',
  'string.base': '422-{{#label}} must be a string',
  'number.base': '422-{{#label}} must be a number',
  'number.min': '422-{{#label}} must be greater than or equal to 1',
  'string.min': '422-{{#label}} must be greater than or equal to 4 character',
  'number.positive': '422-{{#label}} must be greater than 0',

});

const bodyNewClienteValidation = (req, res, next) => {
  const { error } = comprasDTO.validate(req.body);
  if (error) {
    const [code, message] = error.details[0].message.split('-');
    return res.status(Number(code)).json({ message });
  }
  next();
};

const emailValidation = (req, res, next) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(req.body.email)) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    } 
    next();
};

module.exports = {
    bodyNewClienteValidation,
    emailValidation,
};