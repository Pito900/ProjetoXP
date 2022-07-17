const express = require('express');
require('express-async-errors');

const router = express.Router();
// aqui estão todas as validações
const { bodyCompraValidation } = require('../middlewares/bodyCompraMiddleware');

// Rotas relacionadas a compra de ativos
router.use('/investimentos/comprar', require('../controllers/compraController').route);
const { createPurchaseController } = require('../controllers/compraController');

router.post('/investimentos/comprar', bodyCompraValidation, createPurchaseController);
module.exports = router; 