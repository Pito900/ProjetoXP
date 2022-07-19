const express = require('express');
require('express-async-errors');

const router = express.Router();
// aqui estão todas as validações
const { validateToken } = require('../middlewares/authValidation');
const { bodyCompraEVendaValidation } = require('../middlewares/bodyCompraEVendaMiddleware');
const { bodyLoginValidation } = require('../middlewares/bodyLoginValidation');

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
createPurchaseController);

///

// Rotas relacionadas a venda de ativos
router.use('/investimentos/vender', require('../controllers/vendaController').route);
const { createSaleController } = require('../controllers/vendaController');

router.post('/investimentos/vender',
validateToken,
bodyCompraEVendaValidation,
createSaleController);

///

// Rotas para clientes

router.use('/allClientes', require('../controllers/clienteController').route);
const { getAllClienteController } = require('../controllers/clienteController');

router.get('/allClientes',
getAllClienteController);

module.exports = router; 