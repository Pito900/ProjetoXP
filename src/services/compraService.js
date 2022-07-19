const { Compra } = require('../database/models');
const { GettingQtdByCodAtivo, updateQtdDisponivel } = require('./ativoService');
const { updatingSaldo } = require('./clienteService');

const getAllPurchase = async () => {
    const allPurchase = await Compra.findAll();
    return allPurchase;
};

const createPurchase = async ({ codCliente, codAtivo, qtdAtivo }, res) => {
    const qtdDisponivel = await GettingQtdByCodAtivo(codAtivo);
    if (qtdAtivo > qtdDisponivel) {
        return res.status(422).json({ message: 'A "qtdAtivo" é superior a qdtDisponível.' });
    }
    const newPurchase = await Compra.create({ 
        codAtivo, 
        qtdAtivo,
        codCliente, 
        createdAt: new Date(),
    });
    await updatingSaldo(codCliente, codAtivo, qtdAtivo, 'compra');
    await updateQtdDisponivel(qtdAtivo, codAtivo, 'compra');
    return newPurchase;
};

module.exports = {
    getAllPurchase,
    createPurchase,
};