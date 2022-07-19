const express = require('express');
const { createSale } = require('../services/vendaService');
const { gettingIdFromPayload } = require('../services/clienteService');

const route = express.Router();

const createSaleController = async (req, res) => {
    const { email } = res.locals.payload;
    const codCliente = await gettingIdFromPayload(email);
    const { codAtivo, qtdAtivo } = req.body;
    const newSale = await createSale({ codCliente, codAtivo, qtdAtivo }, res);
    return res.status(201).json(newSale);
};

module.exports = {
    route,
    createSaleController,

};