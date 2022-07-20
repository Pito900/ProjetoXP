const { Ativo } = require('../database/models');

const GettingQtdByCodAtivo = async (codAtivo) => {
    const { qtdDisponivel, valor } = await Ativo.findByPk(codAtivo);
    return { qtdDisponivel, valor };
};

const updateQtdDisponivel = async (qtd, codAtivo, vendOrComp) => {
    const { qtdDisponivel } = await GettingQtdByCodAtivo(codAtivo);
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
    GettingQtdByCodAtivo,
    updateQtdDisponivel,
};