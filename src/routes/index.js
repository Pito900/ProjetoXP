const express = require('express');
require('express-async-errors');

const router = express.Router();
// aqui estão todas as validações
const { validateToken } = require('../middlewares/authValidation');
const { bodyCompraValidation } = require('../middlewares/bodyCompraMiddleware');
const { bodyLoginValidation } = require('../middlewares/bodyLoginValidation');

///

// Rotas Relacionadas ao login
router.use('/login', require('../controllers/loginController').route);
const { loginController } = require('../controllers/loginController');

router.post('/login', bodyLoginValidation, loginController);

///

// Rotas relacionadas a compra de ativos
router.use('/investimentos/comprar', require('../controllers/compraController').route);
const { createPurchaseController } = require('../controllers/compraController');

router.post('/investimentos/comprar',
validateToken,
bodyCompraValidation,
createPurchaseController);
module.exports = router; 