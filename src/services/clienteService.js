const { Cliente, Ativo, Compra } = require('../database/models');

const AgrupandoAtivos = (array) => {
    const result = [];
    array.map((ativo) => {
        const ObjAtivo = {};
        if (!result.find((i) => i.codAtivo === ativo.codAtivo)) {
            ObjAtivo.codAtivo = ativo.codAtivo;
            ObjAtivo.qtdAtivo = ativo.qtdAtivo;
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

const getAllAtivoOfThecodClient = async (codCliente) => {
  const allPurchase = await Compra.findAll();
  const allcodClienteAtivos = allPurchase
    .filter((ativo) => ativo.codCliente === codCliente)
    .map((ativo) => ({
        codAtivo: ativo.codAtivo,
        qtdAtivo: ativo.qtdAtivo,
    }));
    const result = AgrupandoAtivos(allcodClienteAtivos);
  return result;
};

const clientNoPassword = async (object) => { // retirei o password para trabalharmos sem essa informação sensível.
    const codClienteAtivos = await getAllAtivoOfThecodClient(object.codCliente)
    const objAtivos = []
    codClienteAtivos.forEach(element => {
        objAtivos.push(element)
    });
    const newObj = {
        codCliente: object.codCliente,
        name: object.name,
        email: object.email,
        image: object.image,
        saldo: object.saldo,
        ativos: objAtivos,
    };
    return newObj;
};

const getAllclients = async () => {
    const clientsAllData = await Cliente.findAll();
    const clientWithoutPassword = clientsAllData.map(async(item) => clientNoPassword(item));
    const result = await Promise.all(clientWithoutPassword);
    console.log(result);
    return result;
};

const getClienteByCod = async (codCliente) => {
    const cliente = await Cliente.findByPk(codCliente);
    return cliente;
};

const gettingIdFromPayload = async (email) => { 
    const allClients = await getAllclients();
    const { codCliente } = allClients.filter((user) => user.email === email)[0];
    return codCliente;
};

const updatingSaldo = async (codCliente, codAtivo, qtd, vendOrComp) => {
    const { valor } = await Ativo.findByPk(codAtivo);
    const { saldo } = await getClienteByCod(codCliente);
    if (vendOrComp === 'compra') {
        await Cliente.update(
            { saldo: (saldo - qtd * valor) }, // aqui estou fazendo o update
            { where: { codCliente } },
            );
    }
    if (vendOrComp === 'venda') {
        await Cliente.update(
            { saldo: (saldo + qtd * valor) }, // aqui estou fazendo o update
            { where: { codCliente } },
            );
    }
};

module.exports = {
    getAllAtivoOfThecodClient,
    getAllclients,
    getClienteByCod,
    gettingIdFromPayload,
    updatingSaldo,
};