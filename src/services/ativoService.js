const { Ativo } = require('../database/models');

const ativoAlreadyReg = (reqBody) => Ativo.findOne({ where: { ticker: reqBody.ticker } }); // verifica se o ativo existe

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

const createAtivo = async (reqBody) => {
    const newAtivo = Ativo.create({
        ticker: reqBody.ticker,
        qtdDisponivel: reqBody.qtdDisponivel,
        valor: reqBody.valor,
    });
    return newAtivo;
};

const updateAtivosInfos = async (codAtivo, ticker, qtdDisponivel, valor) => {
        await Ativo.update(
            { ticker, qtdDisponivel, valor },
            { where: { codAtivo } },
            );
    const ativo = await Ativo.findByPk(codAtivo);
    return ativo;
};

module.exports = {
    ativoAlreadyReg,
    gettingAtivoByCodAtivo,
    updateQtdDisponivel,
    createAtivo,
    updateAtivosInfos,
};