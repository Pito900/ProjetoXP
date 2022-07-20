const { Ativo } = require('../database/models');

const getAllAtivos = async () => {
    const allAtivos = await Ativo.findAll();
    return allAtivos;
};

const gettingAtivoByCodAtivo = async (codAt) => {
    const { qtdDisponivel, valor, codAtivo, ticker } = await Ativo.findByPk(codAt);
    return { codAtivo, ticker, qtdDisponivel, valor: Number(valor) };
};

const updateQtdDisponivel = async (qtd, codAtivo, vendOrComp) => {
    const { qtdDisponivel } = await gettingAtivoByCodAtivo(codAtivo);
    if (vendOrComp === 'compra') {
        await Ativo.update(
            { qtdDisponivel: (qtdDisponivel - qtd) }, // aqui estou fazendo o update
            { where: { codAtivo } },
            );
    }
    if (vendOrComp === 'venda') {
        await Ativo.update(
            { qtdDisponivel: (qtdDisponivel + qtd) }, // aqui estou fazendo o update
            { where: { codAtivo } },
            );
    }
};

module.exports = {
    getAllAtivos,
    gettingAtivoByCodAtivo,
    updateQtdDisponivel,
};