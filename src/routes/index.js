const express = require('express');
require('express-async-errors');

const router = express.Router();
// aqui estão todas as validações
const { validateToken } = require('../middlewares/authValidation');
const { bodyCompraEVendaValidation, 
    clienteValidation } = require('../middlewares/bodyCompraEVendaMiddleware');
const { bodyLoginValidation } = require('../middlewares/bodyLoginValidation');
const { verAtivosDoClienteValidation } = require('../middlewares/ativosCodClienteMiddleware');
const { bodyDepositoEVendaValidation,
    saqueMenorQueSaldo } = require('../middlewares/BodyDepositoESaqueMiddleware');
const { bodyNewClienteValidation,
    emailValidation,
 } = require('../middlewares/bodyNewClienteMiddleware');

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
const { getAllClienteController,
getClienteByCodController,
createClientController,
} = require('../controllers/clienteController');

router.get('/clientes/ativos',
validateToken,
getAllClienteController);

router.get('/clientes/ativos/:codCliente',
validateToken,
getClienteByCodController);

router.post('/newCliente',
bodyNewClienteValidation,
emailValidation,
createClientController);

///

// Rotas para ativos

router.use('/assets/ativos', require('../controllers/ativosController').route);
const {
    gettingQtdByCodAtivoController,
    listarTodasOsAtivosController,
 } = require('../controllers/ativosController');

router.get('/assets/ativos/:codAtivo',
validateToken,
gettingQtdByCodAtivoController);

router.get('/assets',
validateToken,
listarTodasOsAtivosController);

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
const { countClientInfosController } = require('../controllers/clienteController');

router.get('/conta/:codCliente',
validateToken,
verAtivosDoClienteValidation,
countClientInfosController);

module.exports = router; 