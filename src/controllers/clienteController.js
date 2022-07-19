const express = require('express');
const { getAllclients } = require('../services/clienteService');

const route = express.Router();

const getAllClienteController = async (_req, res) => {
    const allClients = await getAllclients();
    return res.status(200).json({ allClients });
};

module.exports = {
    route,
    getAllClienteController,
};