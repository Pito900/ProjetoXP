const { expect } = require('chai');
const sinon = require('sinon');
const { 
    getAllPurchaseController,
 } = require('../../controllers/compraController');
const { Ativo, Compra } = require('../../database/models');
const Mock = require('../mocks/models/index.js');
const comprasMockData = require('../mocks/models/compras.mock.json');


describe(('Testa A função getAllPurchaseController.'), () => {
  let res = {};
  let req = {};
  before(async () => {
    sinon.stub(Compra, "findAll").callsFake(Mock.CompraMock.findAll);
    sinon.stub(Ativo, "findByPk").callsFake(Mock.AtivoMock.findByPk);
    res.status = sinon.stub()
    .returns(res);
    res.json = sinon.stub()
    .returns();
  })
    after(()=> {
      Ativo.findByPk.restore();
    })
    it('O status code deve retornar 200.', async () => {
      await getAllPurchaseController(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true)
    });
    it('Deve retornar todas as compras."', async () => {
        await getAllPurchaseController(req, res);
        expect(res.json.calledWith(comprasMockData)).to.be.equal(true)
    });
});
