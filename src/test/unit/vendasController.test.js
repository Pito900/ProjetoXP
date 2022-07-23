const { expect } = require('chai');
const sinon = require('sinon');
const { 
    getAllVendasController,
 } = require('../../controllers/vendaController');
const { Ativo,  Venda } = require('../../database/models');
const Mock = require('../mocks/models/index.js');
const vendasMockData = require('../mocks/models/vendas.mock.json');


describe(('Testa A função getAllVendasController.'), () => {
  let res = {};
  let req = {};
  before(async () => {
    sinon.stub(Venda, "findAll").callsFake(Mock.VendaMock.findAll);
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
      await getAllVendasController(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true)
    });
    it('Deve retornar todas as vendas."', async () => {
        await getAllVendasController(req, res);
        expect(res.json.calledWith(vendasMockData)).to.be.equal(true)
    });
});