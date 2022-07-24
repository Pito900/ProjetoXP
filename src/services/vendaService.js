const { Venda } = require('../database/models');
const { gettingAtivoByCodAtivo, updateQtdDisponivel } = require('./ativoService');
const { getClienteByCod, 
    updateSaldoVendendoAtivo, 
    getAllVendasDoCliente } = require('./clienteService');

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
    
    await getAllVendasDoCliente(codCliente, qtdAtivo);
    await updateQtdDisponivel(qtdAtivo, codAtivo, 'venda');
    await updateSaldoVendendoAtivo(codCliente, codAtivo, qtdAtivo);
    return result;
};

const getAllVendas = async () => {
    const allVendas = await Venda.findAll();
    const resposta = allVendas.map(async (objeto) => {
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

module.exports = {
    createSale,
    getAllVendas,
};