const express = require('express');
const { getAllPurchase, createPurchase } = require('../services/compraService');
const { gettingIdFromPayload, getAllAtivoOfThecodClient } = require('../services/clienteService');

const route = express.Router();

const getAllPurchaseController = async (_req, res) => {
    const allPurchase = await getAllPurchase();
    const a = await getAllAtivoOfThecodClient(2);
    console.log(a);
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