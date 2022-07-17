const express = require('express');
const { 
    createPurchase,
 } = require('../services/compraService');

const route = express.Router();

const createPurchaseController = async (req, res) => {
        const newPurchase = await createPurchase(req, res);
        return res.status(201).json(newPurchase);
};

module.exports = {
    route,
    createPurchaseController,

};