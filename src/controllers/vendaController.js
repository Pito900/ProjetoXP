const express = require('express');
const { createSale, getAllVendas } = require('../services/vendaService');
const { gettingIdFromPayload } = require('../services/clienteService');

const route = express.Router();

const createSaleController = async (req, res) => {
    const { email } = res.locals.payload;
    const codCliente = await gettingIdFromPayload(email);
    const { codAtivo, qtdAtivo } = req.body;
    const newSale = await createSale({ codCliente, codAtivo, qtdAtivo }, res);
    return res.status(201).json(newSale);
};

const getAllVendasController = async (_req, res) => {
    const allVendas = await getAllVendas();
    return res.status(200).json(allVendas);
};

module.exports = {
    route,
    createSaleController,
    getAllVendasController,

};