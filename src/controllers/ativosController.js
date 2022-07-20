const express = require('express');
const { getAllAtivos, gettingAtivoByCodAtivo } = require('../services/ativoService');

const route = express.Router();

const getAllAtivosController = async (_req, res) => {
    const allAtivos = await getAllAtivos();
    return res.status(200).json(allAtivos);
};

const gettingQtdByCodAtivoController = async (req, res) => {
    const { codAtivo } = req.params;
    const ativo = await gettingAtivoByCodAtivo(codAtivo);
    return res.status(200).json(ativo);
};

module.exports = {
    route,
    getAllAtivosController,
    gettingQtdByCodAtivoController,
};