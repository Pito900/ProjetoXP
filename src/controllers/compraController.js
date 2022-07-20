const express = require('express');
const { gettingIdFromPayload } = require('../services/clienteService');
const { getAllPurchase, createPurchase } = require('../services/compraService');

const route = express.Router();

const getAllPurchaseController = async (_req, res) => {
    const allPurchase = await getAllPurchase();
    return res.status(200).json(allPurchase);
};

const createPurchaseController = async (req, res) => {
    const { email } = res.locals.payload;
    const codCliente = await gettingIdFromPayload(email);
    const { codAtivo, qtdAtivo } = req.body;
    const newPurchase = await createPurchase({ codCliente, codAtivo, qtdAtivo }, res);
    return res.status(201).json(newPurchase);
};

module.exports = {
    route,
    getAllPurchaseController,
    createPurchaseController,

};