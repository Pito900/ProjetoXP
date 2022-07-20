const Joi = require('joi'); // vou fazer com joi para treinar. Me parece mais simples, para essa validação, do que fazer de outra forma
const { gettingIdFromPayload, countClientInfos } = require('../services/clienteService');

const comprasDTO = Joi.object({
    codCliente: Joi.number().min(1).required(),
    valor: Joi.number().positive().required(),
}).messages({
  'any.required': '400-{{#label}} is required',
  'number.base': '422-{{#label}} must be a number',
  'number.min': '422-{{#label}} must be greater than or equal to 1',
  'number.positive': '422-{{#label}} must be greater than 0',

});

const bodyDepositoEVendaValidation = (req, res, next) => {
  const { error } = comprasDTO.validate(req.body);
  if (error) {
    const [code, message] = error.details[0].message.split('-');
    return res.status(Number(code)).json({ message });
  }
  next();
};

const saqueMenorQueSaldo = async (req, res, next) => {
  const { valor } = req.body;
  const codCliente = await gettingIdFromPayload(res.locals.payload.email);
  const { saldo } = await countClientInfos(codCliente);
  if (Number(valor) > Number(saldo)) {
    return res.status(422).json({ message: 'Valor insuficiente para realizar esse saque.' });
  }
  next();
};
  
module.exports = {
    bodyDepositoEVendaValidation,
    saqueMenorQueSaldo,
};