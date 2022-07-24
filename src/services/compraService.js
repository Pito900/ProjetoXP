const { gettingAtivoByCodAtivo, updateQtdDisponivel } = require('./ativoService');
const { Compra, Cliente } = require('../database/models');

const getAllPurchase = async () => {
    const allPurchase = await Compra.findAll();
    const resposta = allPurchase.map(async (objeto) => {
        const { valor, ticker } = await gettingAtivoByCodAtivo(objeto.codAtivo);
        return {
            id: objeto.id,
            codAtivo: objeto.codAtivo,
            ticker,
            qtdAtivo: objeto.qtdAtivo,
            valor: Number(valor),
            codCliente: objeto.codCliente,
            createdAt: objeto.createdAt,
        };
    });
    const result = await Promise.all(resposta);
    return result;
};

const createPurchase = async ({ codCliente, codAtivo, qtdAtivo }, res) => {
    const ativo = await gettingAtivoByCodAtivo(codAtivo);
    if (!ativo) res.status(404).json({ message: 'Esse ativo não existe.' });
    const { qtdDisponivel, valor } = ativo;
    if (qtdAtivo > Number(qtdDisponivel)) {
        return res.status(422).json({ message: 'A "qtdAtivo" é superior a qdtDisponível.' });
    }
    await Compra.create({ codAtivo, qtdAtivo, codCliente, createdAt: new Date() });
    const result = { codAtivo, qtdAtivo, codCliente, valor: Number(valor), createdAt: new Date() };
    await updateQtdDisponivel(qtdAtivo, codAtivo, 'compra');
    const { saldo } = await Cliente.findByPk(codCliente);
    await Cliente.update(
        { saldo: (Number(saldo) - qtdAtivo * Number(valor)) }, // aqui estou fazendo o update do saldo quando compramos um ativo
        { where: { codCliente } },
        );
    return result;
};

module.exports = {
    getAllPurchase,
    createPurchase,
};