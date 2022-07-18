const { Cliente } = require('../database/models');

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

const gettingIdFromPayload = async (email) => { 
    const allClients = await getAllclients();
    const { codCliente } = allClients.filter((user) => user.email === email)[0];
    return codCliente;
};

module.exports = {
    gettingIdFromPayload,
};