const express = require('express');
const { listarTodasOsAtivos } = require('../services/clienteService');
const {
    gettingAtivoByCodAtivo,
 } = require('../services/ativoService');

const route = express.Router();

const gettingQtdByCodAtivoController = async (req, res) => {
    const { codAtivo } = req.params;
    const ativo = await gettingAtivoByCodAtivo(codAtivo);
    return res.status(200).json(ativo);
};

const listarTodasOsAtivosController = async (_req, res) => {
    const allAtivos = await listarTodasOsAtivos();
    return res.status(200).json(allAtivos);
};

module.exports = {
    route,
    gettingQtdByCodAtivoController,
    listarTodasOsAtivosController,
};