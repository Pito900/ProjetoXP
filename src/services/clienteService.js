const { Cliente, Ativo, Venda } = require('../database/models');
const { getAllPurchase } = require('./compraService');

const arraydeAtivos = async (array1, array2) => {
    let result = [];
    for (let i = 0; i < array1.length; i++) {
        const ObjAtivo = {};
        ObjAtivo.codAtivo = array1[i].codAtivo;
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
          qtdAtivo: ativo.qtdAtivo,
          valor: ativo.valor,
      }));
      const result = AgrupandoAtivos(allcodClienteAtivos);
    return result;
  };

const clientNoPassword = async (object) => { // retirei o password para trabalharmos sem essa informação sensível.
    const codClienteAtivos = await getAllAtivoOfThecodClient(object.codCliente);
    const clientVendas = await updateAtivosClienteVenda(object.codCliente);
    const arrayAtivos = await arraydeAtivos(codClienteAtivos, clientVendas);
    const newObj = {
        codCliente: object.codCliente,
        name: object.name,
        email: object.email,
        image: object.image,
        saldo: object.saldo,
        ativos: arrayAtivos,
    };
    return newObj;
};

const getAllclients = async () => {
    const clientsAllData = await Cliente.findAll();
    const clientWithoutPassword = clientsAllData.map(async (item) => clientNoPassword(item));
    const result = await Promise.all(clientWithoutPassword);
    return result;
};

const getClienteByCod = async (codCliente) => {
    const cliente = await Cliente.findByPk(codCliente);
    const result = await clientNoPassword(cliente);
    return result;
};

const gettingIdFromPayload = async (email) => { 
    const allClients = await getAllclients();
    const { codCliente } = allClients.filter((user) => user.email === email)[0];
    return codCliente;
};

const updatingSaldo = async (codCliente, codAtivo, qtd) => {
    const { valor } = await Ativo.findByPk(codAtivo);
    const { saldo } = await Cliente.findByPk(codCliente);
        await Cliente.update(
            { saldo: (Number(saldo) + qtd * Number(valor)) }, // aqui estou fazendo o update do saldo quando vendemos um ativo
            { where: { codCliente } },
            );
};

module.exports = {
    arraydeAtivos,
    updateAtivosClienteVenda,
    getAllAtivoOfThecodClient,
    getAllclients,
    getClienteByCod,
    gettingIdFromPayload,
    updatingSaldo,
};