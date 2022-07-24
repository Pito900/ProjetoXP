const express = require('express');
const { 
    // getAllclients, 
    getClienteByCod,
    countClientInfos,
    createClient,
    updateClienteEmail,
    updateClienteImageEName,
 } = require('../services/clienteService');
const { generateToken } = require('../utils/JWT');

const route = express.Router();

// const getAllClienteController = async (_req, res) => {
//     const allClients = await getAllclients();
//     return res.status(200).json(allClients);
// };

const getClienteByCodClienteController = async (req, res) => {
    const { codCliente } = req.params;
    const cliente = await getClienteByCod(codCliente);
    return res.status(200).json(cliente);
};

const countClientInfosController = async (req, res) => {
    const { codCliente } = req.params;
    const cliente = await countClientInfos(codCliente);
    return res.status(200).json(cliente);
};

const createClientController = async (req, res) => {
    const newCliente = await createClient(req.body, res);
    const token = generateToken(JSON.stringify({ email: newCliente.email }));
    return res.status(201).json({ token });
};

const updateClienteInfosController = async (req, res) => {
    await updateClienteImageEName(req.body);
    return res.status(200).json({ message: 'Atualizado! Você precisa relogar.' });
};

const updateClienteEmailInfosController = async (req, res) => {
    await updateClienteEmail(req.body);
    return res.status(200).json({ message: 'Atualizado! Você precisa relogar.' });
};

module.exports = {
    route,
    // getAllClienteController,
    getClienteByCodClienteController,
    countClientInfosController,
    createClientController,
    updateClienteInfosController,
    updateClienteEmailInfosController,
};