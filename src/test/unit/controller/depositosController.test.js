const { expect } = require('chai');
const sinon = require('sinon');
const { 
    getAllDepositosController,
 } = require('../../../controllers/depositoController');
const { Deposito } = require('../../../database/models');
const Mock = require('../../mocks/models/index.js');
const depositosMockData = require('../../mocks/models/depositos.mock.json');


describe(('Testa A função getAllDepositosController.'), () => {
  let res = {};
  let req = {};
  before(async () => {
    sinon.stub(Deposito, "findAll").callsFake(Mock.DepositoMock.findAll);
    res.status = sinon.stub()
    .returns(res);
    res.json = sinon.stub()
    .returns();
  })
    after(()=> {
        Deposito.findAll.restore();
    })
    it('O status code deve retornar 200.', async () => {
      await getAllDepositosController(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true)
    });
    it('Deve retornar todos os Depositos.', async () => {
        await getAllDepositosController(req, res);
        expect(res.json.calledWith(depositosMockData)).to.be.equal(true)
    });
});