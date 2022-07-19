const { Cliente } = require('../database/models');
const { Ativo } = require('../database/models');

const clientNoPassword = (object) => { // retirei o password para trabalharmos sem essa informação sensível.
    const newObj = {
        codCliente: object.codCliente,
        name: object.name,
        email: object.email,
        image: object.image,
        saldo: object.saldo,
    };
    return newObj;
};

const getAllclients = async () => {
    const clientsAllData = await Cliente.findAll();
    const clientWithoutPassword = clientsAllData.map((item) => clientNoPassword(item));
    return clientWithoutPassword;
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

const updatingSaldoComprar = async (codCliente, codAtivo, qtd) => {
    const { valor } = await Ativo.findByPk(codAtivo);
    const { saldo } = await getClienteByCod(codCliente);
    await Cliente.update(
        { saldo: (saldo - qtd * valor) }, // aqui estou fazendo o update
        { where: { codCliente } },
    );
};

module.exports = {
    gettingIdFromPayload,
    updatingSaldoComprar,
};