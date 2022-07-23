const express = require('express');
const { 
    clientAlreadyReg,
    // getAllclients, 
    getClienteByCod,
    countClientInfos,
    createClient,
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
    const clientAlreadyExist = await clientAlreadyReg(req.body);
    if (clientAlreadyExist) {
        return res.status(409).json({ message: 'Esse cliente  já está cadastrado.' });
    }
    const newCliente = await createClient(req.body);
    const token = generateToken(JSON.stringify({ email: newCliente.email }));
    return res.status(201).json({ token });
};

module.exports = {
    route,
    // getAllClienteController,
    getClienteByCodClienteController,
    countClientInfosController,
    createClientController,
};