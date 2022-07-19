const { Ativo } = require('../database/models');

const GettingQtdByCodAtivo = async (codAtivo) => {
    const { qtdDisponivel } = await Ativo.findByPk(codAtivo);
    return qtdDisponivel;
};

const updateQtdDisponivel = async (qtd, codAtivo, vendOrComp) => {
    const qtdDisponivelAntes = await GettingQtdByCodAtivo(codAtivo);
    if (vendOrComp === 'compra') {
        await Ativo.update(
            { qtdDisponivel: (qtdDisponivelAntes - qtd) }, // aqui estou fazendo o update
            { where: { codAtivo } },
            );
    }
    if (vendOrComp === 'venda') {
        await Ativo.update(
            { qtdDisponivel: (qtdDisponivelAntes + qtd) }, // aqui estou fazendo o update
            { where: { codAtivo } },
            );
    }
};

module.exports = {
    GettingQtdByCodAtivo,
    updateQtdDisponivel,
};