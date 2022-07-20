const express = require('express');
const { getAllclients, getClienteByCod } = require('../services/clienteService');

const route = express.Router();

const getAllClienteController = async (_req, res) => {
    const allClients = await getAllclients();
    return res.status(200).json(allClients);
};

const getClienteByCodController = async (req, res) => {
    const { codCliente } = req.params;
    const cliente = await getClienteByCod(codCliente);
    return res.status(200).json(cliente);
};

module.exports = {
    route,
    getAllClienteController,
    getClienteByCodController,
};