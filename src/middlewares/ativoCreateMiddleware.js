const Joi = require('joi'); // vou fazer com joi para treinar. Me parece mais simples, para essa validação, do que fazer de outra forma

const comprasDTO = Joi.object({
    ticker: Joi.string().min(1).required(),
    qtdDisponivel: Joi.number().min(1).required(),
    valor: Joi.number().min(1).required(),
}).messages({
  'any.required': '400-{{#label}} is required',
  'number.base': '422-{{#label}} must be a number',
  'string.base': '422-{{#label}} must be a string',
  'number.min': '422-{{#label}} must be greater than or equal to 1',

});

const createAtivoValidation = (req, res, next) => {
  const { error } = comprasDTO.validate(req.body);
  if (error) {
    const [code, message] = error.details[0].message.split('-');
    return res.status(Number(code)).json({ message });
  }
  next();
};

module.exports = { 
    createAtivoValidation,
}; 