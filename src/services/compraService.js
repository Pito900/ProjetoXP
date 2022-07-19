const { Compra } = require('../database/models');
const { GettingQtdByCodAtivo, updateQtdDisponivel } = require('./ativoService');
const { updatingSaldoComprar } = require('./clienteService');

const createPurchase = async ({ codCliente, codAtivo, qtdAtivo }, res) => {
    const qtdDisponivel = await GettingQtdByCodAtivo(codAtivo);
    if (qtdAtivo > qtdDisponivel) {
        return res.status(422).json({ message: 'A "qtdAtivo" é superior a qdtDisponível.' });
    }
    const newPurchase = await Compra.create({ 
        codCliente, 
        codAtivo, 
        qtdComprada: qtdAtivo,
        createdAt: new Date(),
    });
    await updatingSaldoComprar(codCliente, codAtivo, qtdAtivo);
    await updateQtdDisponivel(qtdAtivo, codAtivo);
    return newPurchase;
};

module.exports = {
    createPurchase,
};