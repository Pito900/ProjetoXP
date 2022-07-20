const express = require('express');
require('express-async-errors');

const router = express.Router();
// aqui estão todas as validações
const { validateToken } = require('../middlewares/authValidation');
const { bodyCompraEVendaValidation, 
    clienteValidation } = require('../middlewares/bodyCompraEVendaMiddleware');
const { bodyLoginValidation } = require('../middlewares/bodyLoginValidation');
const { verAtivosDoClienteValidation } = require('../middlewares/ativosCodClienteMiddleware');

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

router.get('/allCompras',
getAllPurchaseController);

router.post('/investimentos/comprar',
validateToken,
bodyCompraEVendaValidation,
clienteValidation,
createPurchaseController);

///

// Rotas relacionadas a venda de ativos
router.use('/investimentos/vender', require('../controllers/vendaController').route);
const { createSaleController } = require('../controllers/vendaController');

router.post('/investimentos/vender',
validateToken,
bodyCompraEVendaValidation,
clienteValidation,
createSaleController);

///

// Rotas para clientes

router.use('/clientes/ativos', require('../controllers/clienteController').route);
const { getAllClienteController,
getClienteByCodController,
} = require('../controllers/clienteController');

router.get('/clientes/ativos',
getAllClienteController);

router.get('/clientes/ativos/:codCliente',
validateToken,
verAtivosDoClienteValidation,
getClienteByCodController);

///

// Rotas para ativos

router.use('/assets/ativos', require('../controllers/ativosController').route);
const { getAllAtivosController, 
    gettingQtdByCodAtivoController } = require('../controllers/ativosController');

router.get('/assets/ativos',
getAllAtivosController);

router.get('/assets/ativos/:codAtivo',
validateToken,
gettingQtdByCodAtivoController);

///

// Rotas para Depósitos
router.use('/conta/deposito', require('../controllers/depositoController').route);
const { createDepositoController } = require('../controllers/depositoController');

router.post('/conta/deposito',
createDepositoController);

///

// Rotas para Saque
router.use('/conta/saque', require('../controllers/saqueController').route);
const { createSaqueController } = require('../controllers/saqueController');

router.post('/conta/saque',
createSaqueController);

module.exports = router; 