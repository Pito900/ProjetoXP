const Joi = require('joi'); // vou fazer com joi para treinar. Me parece mais simples, para essa validação, do que fazer de outra forma
const { getAllclients } = require('../services/clienteService');

const comprasDTO = Joi.object({
    codCliente: Joi.number().min(1).required(),
    codAtivo: Joi.number().min(1).required(),
    qtdAtivo: Joi.number().min(1).required(),
}).messages({
  'any.required': '400-{{#label}} is required',
  'number.base': '422-{{#label}} must be a number',
  'number.min': '422-{{#label}} must be greater than or equal to 1',

});

const bodyCompraEVendaValidation = (req, res, next) => {
  const { error } = comprasDTO.validate(req.body);
  if (error) {
    const [code, message] = error.details[0].message.split('-');
    return res.status(Number(code)).json({ message });
  }
  next();
};

const clienteValidation = async (req, res, next) => { // validamos aqui se que está comprando e vendendo está logado
    const { codCliente } = req.body;
    const { email } = res.locals.payload;
    const allClients = await getAllclients();
    const clienterData = allClients.filter((user) => user.email === email)[0];
    if (clienterData.codCliente !== codCliente) {
        return res.status(401).json({ 
            message: 'Você não é o usuário autorizado para realizar esta operação.',
        });
    }
     next();
 };

module.exports = {
    bodyCompraEVendaValidation,
    clienteValidation,
};