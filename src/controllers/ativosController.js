const express = require('express');
const { listarTodasOsAtivos } = require('../services/clienteService');
const {
    gettingAtivoByCodAtivo,
 } = require('../services/ativoService');

const route = express.Router();

const gettingAtivoByCodAtivoController = async (req, res) => {
    const { codAtivo } = req.params;
    const ativo = await gettingAtivoByCodAtivo(codAtivo);
    if (!ativo) {
       return res.status(404).json({ message: 'Ativo não encontrado.' });
    }
    return res.status(200).json(ativo);
};

const listarTodasOsAtivosController = async (_req, res) => {
    const allAtivos = await listarTodasOsAtivos();
    return res.status(200).json(allAtivos);
};

module.exports = {
    route,
    gettingAtivoByCodAtivoController,
    listarTodasOsAtivosController,
};