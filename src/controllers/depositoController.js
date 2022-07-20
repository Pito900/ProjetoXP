const express = require('express');
const { createDeposito } = require('../services/depositoService');

const route = express.Router();

const createDepositoController = async (req, res) => {
    const { codCliente, valor } = req.body; 
    const deposito = await createDeposito(codCliente, valor);
    return res.status(200).json(deposito);
};

module.exports = {
    route,
    createDepositoController,
};