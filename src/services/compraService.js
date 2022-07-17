const { Compra } = require('../database/models');
const { GettingQtdByCodAtivo, updateQtdDisponivel } = require('./ativoService');

const createPurchase = async (req, res) => {
    const { codCliente, codAtivo, qtdAtivo } = req.body;
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
    await updateQtdDisponivel(qtdAtivo, codAtivo);
    return newPurchase;
};

module.exports = {
    createPurchase,
};