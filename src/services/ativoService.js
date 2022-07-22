const { Ativo } = require('../database/models');

const gettingAtivoByCodAtivo = async (codAt) => {
    const ativo = await Ativo.findByPk(codAt);
    if (!ativo) {
        return ativo;
     }
    const { qtdDisponivel, valor, codAtivo, ticker } = ativo;
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
    gettingAtivoByCodAtivo,
    updateQtdDisponivel,
};