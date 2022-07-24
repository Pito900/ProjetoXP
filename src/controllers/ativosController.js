const express = require('express');
const { listarTodasOsAtivos } = require('../services/clienteService');
const {
    ativoAlreadyReg,
    gettingAtivoByCodAtivo,
    createAtivo,
    updateAtivosInfos,
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

const createAtivoController = async (req, res) => {
    const ativoAlreadyExist = await ativoAlreadyReg(req.body);
    if (ativoAlreadyExist) {
        return res.status(409).json({ message: 'Este ativo já está cadastrado.' });
    }
    const newAtivo = await createAtivo(req.body);
    return res.status(201).json(newAtivo);
};

const updateAtivosInfosController = async (req, res) => {
    const { codAtivo, ticker, qtdDisponivel, valor } = req.body;
    const ativoPUT = await updateAtivosInfos(codAtivo, ticker, qtdDisponivel, valor);
    return res.status(200).json(ativoPUT);
};

module.exports = {
    route,
    gettingAtivoByCodAtivoController,
    listarTodasOsAtivosController,
    createAtivoController,
    updateAtivosInfosController,
};