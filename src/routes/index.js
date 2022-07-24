const express = require('express');
require('express-async-errors');

const router = express.Router();
// aqui estão todas as validações
const { validateToken } = require('../middlewares/authValidation');
const { bodyCompraEVendaValidation, 
    clienteValidation } = require('../middlewares/bodyCompraEVendaMiddleware');
const { bodyLoginValidation } = require('../middlewares/bodyLoginValidation');
const { acesssoClienteValidation } = require('../middlewares/acessoCodClienteMiddleware');
const { bodyDepositoEVendaValidation,
    saqueMenorQueSaldo } = require('../middlewares/BodyDepositoESaqueMiddleware');
const { bodyNewClienteValidation,
    emailValidation,
 } = require('../middlewares/bodyNewClienteMiddleware');
 const { createAtivoValidation } = require('../middlewares/ativoCreateMiddleware');

///

// Rotas Relacionadas ao login
router.use('/login', require('../controllers/loginController').route);
const { loginController } = require('../controllers/loginController');

router.post('/login', bodyLoginValidation, loginController);

///

// Rotas relacionadas a compra de ativos
router.use('/investimentos/comprar', require('../controllers/compraController').route);
const { 
getAllPurchaseController,
createPurchaseController, 
} = require('../controllers/compraController');

router.get('/investimentos/logCompras',
getAllPurchaseController);

router.post('/investimentos/comprar',
validateToken,
bodyCompraEVendaValidation,
clienteValidation,
createPurchaseController);

///

// Rotas relacionadas a venda de ativos
router.use('/investimentos/vender', require('../controllers/vendaController').route);
const { createSaleController, 
    getAllVendasController,
} = require('../controllers/vendaController');

router.post('/investimentos/vender',
validateToken,
bodyCompraEVendaValidation,
clienteValidation,
createSaleController);

router.get('/investimentos/logVendas',
validateToken,
getAllVendasController);

///

// Rotas para clientes

router.use('/clientes/ativos', require('../controllers/clienteController').route);
const { 
getClienteByCodClienteController,
createClientController,
updateClienteInfosController,
updateClienteEmailInfosController,
} = require('../controllers/clienteController');

router.get('/clientes/ativos/:codCliente',
validateToken,
getClienteByCodClienteController);

router.post('/newCliente',
bodyNewClienteValidation,
emailValidation,
createClientController);

router.put('/conta/update',
validateToken,
clienteValidation,
updateClienteInfosController);

router.put('/conta/update/email',
validateToken,
clienteValidation,
updateClienteEmailInfosController);

///

// Rotas para ativos

router.use('/assets/ativos', require('../controllers/ativosController').route);
const {
    gettingAtivoByCodAtivoController,
    listarTodasOsAtivosController,
    creatAtivoController,
    updateAtivosInfosController,
 } = require('../controllers/ativosController');

router.get('/assets/ativos/:codAtivo',
validateToken,
acesssoClienteValidation,
gettingAtivoByCodAtivoController);

router.get('/assets',
validateToken,
acesssoClienteValidation,
listarTodasOsAtivosController);

router.post('/assets/newAtivo',
validateToken,
acesssoClienteValidation,
createAtivoValidation,
creatAtivoController);

router.put('/assets/ativos/update',
validateToken,
acesssoClienteValidation,
updateAtivosInfosController);

///

// Rotas para Depósitos
router.use('/conta/deposito', require('../controllers/depositoController').route);
const { createDepositoController, 
    getAllDepositosController,
} = require('../controllers/depositoController');

router.post('/conta/deposito',
validateToken,
clienteValidation,
bodyDepositoEVendaValidation,
createDepositoController);

router.get('/conta/logDepositos',
validateToken,
acesssoClienteValidation,
getAllDepositosController);

///

// Rotas para Saque
router.use('/conta/saque', require('../controllers/saqueController').route);
const { createSaqueController,
    getAllSaquesController,
 } = require('../controllers/saqueController');

router.post('/conta/saque',
validateToken,
clienteValidation,
bodyDepositoEVendaValidation,
saqueMenorQueSaldo,
createSaqueController);

router.get('/conta/logSaques',
validateToken,
getAllSaquesController);

///

// Rota para informações da conta

router.use('/clientes/ativos', require('../controllers/clienteController').route);
const { countClientInfosController, 
    deleteContaController } = require('../controllers/clienteController');

router.get('/conta/:codCliente',
validateToken,
acesssoClienteValidation,
countClientInfosController);

router.delete('/conta/delete/:codCliente',
validateToken,
clienteValidation,
acesssoClienteValidation,
deleteContaController);

module.exports = router; 