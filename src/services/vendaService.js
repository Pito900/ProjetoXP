const { Venda } = require('../database/models');
const { updateQtdDisponivel } = require('./ativoService');
const { getClienteByCod, 
    updateSaldoVendendoAtivo, 
    updateAtivosClienteVenda } = require('./clienteService');

const createSale = async ({ codCliente, codAtivo, qtdAtivo }, res) => {
    const { ativos } = await getClienteByCod(codCliente);
    const ativo = ativos.filter((objeto) => objeto.codAtivo === codAtivo)[0];
    if (!ativo) {
        return res.status(422).json({ message: 'O cliente não possui essse ativo.' });
    }
    if (qtdAtivo > ativo.qtdAtivo) {
        return res.status(422).json({ message: 'A "qtdAtivo" é superior a qtdAtivo do cliente.' });
    }
    await Venda.create({ codAtivo, qtdAtivo, codCliente, createdAt: new Date() });
    const result = { 
        codAtivo, qtdAtivo, codCliente, valor: Number(ativo.valor), createdAt: new Date(),
    };
    
    await updateAtivosClienteVenda(codCliente, qtdAtivo);
    await updateQtdDisponivel(qtdAtivo, codAtivo, 'venda');
    await updateSaldoVendendoAtivo(codCliente, codAtivo, qtdAtivo);
    return result;
};

const getAllVendas = async () => {
    const allVendas = await Venda.findAll();
    return allVendas;
};

module.exports = {
    createSale,
    getAllVendas,
};