const { Cliente, Ativo, Venda } = require('../database/models');
const { getAllPurchase } = require('./compraService');

const clientAlreadyReg = (reqBody) => Cliente.findOne({ where: { email: reqBody.email } });

const arraydeAtivos = async (array1, array2) => {
    let result = [];
    for (let i = 0; i < array1.length; i++) {
        const ObjAtivo = {};
        ObjAtivo.codAtivo = array1[i].codAtivo;
        ObjAtivo.ticker = array1[i].ticker;
        ObjAtivo.qtdAtivo = array1[i].qtdAtivo;
        ObjAtivo.valor = array1[i].valor;
        for (let k = 0; k < array2.length; k++) {
           if (array1[i].codAtivo === array2[k].codAtivo) {
            let r = array1[i].qtdAtivo;
            r -= array2[k].qtdAtivo;
            ObjAtivo.qtdAtivo = r;
           }
        }
        result.push(ObjAtivo);
     }
    return result;
};

const AgrupandoAtivos = (array) => {
    const result = [];
    array.map((ativo) => {
        const ObjAtivo = {};
        if (!result.find((i) => i.codAtivo === ativo.codAtivo)) {
            ObjAtivo.codAtivo = ativo.codAtivo;
            ObjAtivo.ticker = ativo.ticker;
            ObjAtivo.qtdAtivo = ativo.qtdAtivo;
            ObjAtivo.valor = ativo.valor;
           return result.push(ObjAtivo);
        }
        return result.map((a) => {
            if (a.codAtivo === ativo.codAtivo) {
                a.qtdAtivo += ativo.qtdAtivo;
            }
        });
    });
    return result;
};

const updateAtivosClienteVenda = async (codCliente) => {
    const allPurchase = await Venda.findAll();
    const allcodClienteVenda = allPurchase
    .filter((ativo) => ativo.codCliente === codCliente)
    .map((ativo) => ({
        codAtivo: ativo.codAtivo,
        ticker: ativo.ticker,
        qtdAtivo: ativo.qtdAtivo,
        valor: ativo.valor,
    }));
    const result = AgrupandoAtivos(allcodClienteVenda);
    return result;
  };

const getAllAtivoOfThecodClient = async (codCliente) => {
    const allPurchase = await getAllPurchase();
    const allcodClienteAtivos = allPurchase
      .filter((ativo) => ativo.codCliente === codCliente)
      .map((ativo) => ({
          codAtivo: ativo.codAtivo,
          ticker: ativo.ticker,
          qtdAtivo: ativo.qtdAtivo,
          valor: ativo.valor,
      }));
      const result = AgrupandoAtivos(allcodClienteAtivos);
    return result;
  };

const npPasswordPathClienteAtivos = async (object) => { // retirei o password para trabalharmos sem essa informação sensível.
    const codClienteAtivos = await getAllAtivoOfThecodClient(object.codCliente);
    const clientVendas = await updateAtivosClienteVenda(object.codCliente);
    const arrayAtivos = await arraydeAtivos(codClienteAtivos, clientVendas);
    const newObj = {
        codCliente: object.codCliente,
        email: object.email,
        ativos: arrayAtivos,
    };
    return newObj;
};

const getAllclients = async () => {
    const clientsAllData = await Cliente.findAll();
    const clientWithoutPassword = clientsAllData
        .map(async (item) => npPasswordPathClienteAtivos(item));
    const result = await Promise.all(clientWithoutPassword);
    return result;
};

const listarTodasOsAtivos = async () => {
    const CarteiraDosClientes = await getAllclients();
    const allAtivos = await Ativo.findAll();
    const carteiras = CarteiraDosClientes.map((carteira) => ({
        codCliente: carteira.codCliente,
        ativos: carteira.ativos,
    }));
    const ListaAtivos = {
        Corretora: allAtivos,
        Carteiras: carteiras,
    };
    return ListaAtivos;
};

const getClienteByCod = async (codCliente) => {
    const cliente = await Cliente.findByPk(codCliente);
    const result = await npPasswordPathClienteAtivos(cliente);
    return result;
};

const gettingIdFromPayload = async (email) => { 
    const allClients = await getAllclients();
    const { codCliente } = allClients.filter((user) => user.email === email)[0];
    return codCliente;
};

const updateSaldoVendendoAtivo = async (codCliente, codAtivo, qtd) => {
    const { valor } = await Ativo.findByPk(codAtivo);
    const { saldo } = await Cliente.findByPk(codCliente);
        await Cliente.update(
            { saldo: (Number(saldo) + qtd * Number(valor)) }, // aqui estou fazendo o update do saldo quando vendemos um ativo
            { where: { codCliente } },
            );
};

const updateSaldoDepositoOuSaque = async (codCliente, valor, deposito) => {
    const { saldo } = await Cliente.findByPk(codCliente);
    if (deposito === 'deposito') {
        await Cliente.update(
            { saldo: (Number(saldo) + Number(valor)) },
            { where: { codCliente } },
            );
    } else {
        await Cliente.update(
            { saldo: (Number(saldo) - Number(valor)) }, 
            { where: { codCliente } },
            );
    }
};

const countClientInfos = async (codCliente) => {
    const cliente = await Cliente.findByPk(codCliente);
    const result = {
        codCliente: cliente.codCliente,
        name: cliente.name,
        email: cliente.email,
        image: cliente.image,
        saldo: cliente.saldo,
    };
    return result;
};

const createClient = async (reqBody, res) => {
    const oldCliente = await clientAlreadyReg(reqBody);
    if (oldCliente) {
        return res.status(409).json({ message: 'Esse cliente  já está cadastrado.' });
    }
    const newCliente = Cliente.create({
        name: reqBody.name,
        email: reqBody.email,
        image: reqBody.image,
        saldo: reqBody.saldo,
    });
    return newCliente;
};

const updateClienteEmail = async (reqBody, res) => {
    const oldCliente = await clientAlreadyReg(reqBody)
    if (oldCliente) {
        return res.status(409).json({ message: 'Esse cliente  já está cadastrado.' });
    }
    await Cliente.update(
        { email: reqBody.email },
        { where: { codCliente: reqBody.codCliente } },
        );
}

const updateClienteImageEName = async (reqBody) => {
    const { codCliente, name, image } = reqBody
    await Cliente.update(
        { name, image },
        { where: { codCliente } },
        );
}
module.exports = {
    clientAlreadyReg,
    arraydeAtivos,
    updateAtivosClienteVenda,
    getAllAtivoOfThecodClient,
    getAllclients,
    listarTodasOsAtivos,
    getClienteByCod,
    gettingIdFromPayload,
    updateSaldoVendendoAtivo,
    updateSaldoDepositoOuSaque,
    countClientInfos,
    createClient,
    updateClienteEmail,
    updateClienteImageEName,
};