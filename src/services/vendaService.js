const { Venda } = require('../database/models');
const { updateQtdDisponivel } = require('./ativoService');
const { getClienteByCod, updatingSaldo } = require('./clienteService');

const createSale = async ({ codCliente, codAtivo, qAtivo }, res) => {
    const { qtdAtivo } = await getClienteByCod(codCliente);
    if (qAtivo > qtdAtivo) {
        return res.status(422).json({ message: 'A "qAtivo" é superior a qtdAtivo.' });
    }
    const newSale = await Venda.create({ 
        codAtivo, 
        qtdAtivo,
        codCliente, 
        createdAt: new Date(),
    });
    await updatingSaldo(codCliente, codAtivo, qAtivo, 'venda');
    await updateQtdDisponivel(qAtivo, codAtivo, 'venda');
    return newSale;
};

module.exports = {
    createSale,
};