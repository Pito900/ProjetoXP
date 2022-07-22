const { Deposito } = require('../database/models');
const { updateSaldoDepositoOuSaque } = require('./clienteService');

const createDeposito = async (codCliente, valor) => {
    const result = await Deposito.create({ codCliente, valor, createdAt: new Date() });
    await updateSaldoDepositoOuSaque(codCliente, valor, 'deposito');
    return result;
};

const getAllDepositos = async () => {
    const result = await Deposito.findAll();
    return result;
};

module.exports = {
    createDeposito,
    getAllDepositos,
};