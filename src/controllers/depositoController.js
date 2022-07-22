const express = require('express');
const { createDeposito, getAllDepositos } = require('../services/depositoService');

const route = express.Router();

const createDepositoController = async (req, res) => {
    const { codCliente, valor } = req.body; 
    const deposito = await createDeposito(codCliente, valor);
    return res.status(201).json(deposito);
};

const getAllDepositosController = async (_req, res) => {
    const deposito = await getAllDepositos();
    return res.status(200).json(deposito);
};
module.exports = {
    route,
    createDepositoController,
    getAllDepositosController,
};