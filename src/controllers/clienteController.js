const express = require('express');
const { 
    getClienteByCod,
    countClientInfos,
    createClient,
    updateClienteEmail,
    updateClienteImageEName,
    deleteConta,
 } = require('../services/clienteService');
const { generateToken } = require('../utils/JWT');

const route = express.Router();

const getClienteByCodClienteController = async (req, res) => {
    const { codCliente } = req.params;
    const cliente = await getClienteByCod(codCliente);
    return res.status(200).json(cliente);
};

const countClientInfosController = async (req, res) => {
    const { codCliente } = req.params;
    const cliente = await countClientInfos(codCliente, res);
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

const deleteContaController = async (req, res) => {
    const { codCliente } = req.params;
    const result = await deleteConta(codCliente, res);
    return res.status(204).json(result);
};

module.exports = {
    route,
    getClienteByCodClienteController,
    countClientInfosController,
    createClientController,
    updateClienteInfosController,
    updateClienteEmailInfosController,
    deleteContaController,
};