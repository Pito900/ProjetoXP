const { Saque } = require('../database/models');
const { updateSaldoDepositoOuSaque } = require('./clienteService');

const createSaque = async (codCliente, valor) => {
    const result = await Saque.create({ codCliente, valor, createdAt: new Date() });
    await updateSaldoDepositoOuSaque(codCliente, valor, 'saque');
    return result;
};

const getAllSaques = async () => {
    const result = await Saque.findAll();
    return result;
};

module.exports = {
    createSaque,
    getAllSaques,
};