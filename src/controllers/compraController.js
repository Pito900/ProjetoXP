const express = require('express');
const { createPurchase } = require('../services/compraService');
const { gettingIdFromPayload } = require('../services/clienteService');

const route = express.Router();

const createPurchaseController = async (req, res) => {
    const { email } = res.locals.payload;
    const codCliente = await gettingIdFromPayload(email);
    const { codAtivo, qtdAtivo } = req.body;
    const newPurchase = await createPurchase({ codCliente, codAtivo, qtdAtivo }, res);
    return res.status(201).json(newPurchase);
};

module.exports = {
    route,
    createPurchaseController,

};