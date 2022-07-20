const express = require('express');
const { createSaque } = require('../services/saqueService');

const route = express.Router();

const createSaqueController = async (req, res) => {
    const { codCliente, valor } = req.body; 
    const deposito = await createSaque(codCliente, valor);
    return res.status(200).json(deposito);
};

module.exports = {
    route,
    createSaqueController,
};