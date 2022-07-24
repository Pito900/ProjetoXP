const { getAllclients } = require('../services/clienteService');

const verAtivosDoClienteValidation = async (req, res, next) => { // validamos aqui se o usuário é o mesmo q mudou o post
    const { codCliente } = req.params;
    const { email } = res.locals.payload; // aqui usei o token do loginPost no insomnia
    const allClients = await getAllclients();
    const clienterData = allClients.filter((user) => user.email === email)[0];
    if (clienterData.codCliente !== Number(codCliente) && clienterData.codCliente !== 1) {
        return res.status(401).json({ 
            message: 'Acessso não autorizado para o usuário logado.',
        });
    }
     next();
 };

 module.exports = { 
    verAtivosDoClienteValidation,
}; 