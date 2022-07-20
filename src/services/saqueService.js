const { Saque } = require('../database/models');
const { updateSaldoDepositoOuSaque } = require('./clienteService');

const createSaque = async (codCliente, valor) => {
    const result = await Saque.create({ codCliente, valor, createdAt: new Date() });
    await updateSaldoDepositoOuSaque(codCliente, valor, 'saque');
    return result;
};

module.exports = {
    createSaque,
};