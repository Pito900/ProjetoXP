const { expect } = require('chai');
const sinon = require('sinon');
const { 
    getAllSaquesController,
 } = require('../../../controllers/saqueController');
const { Saque } = require('../../../database/models');
const Mock = require('../../mocks/models/index.js');
const saquesMockData = require('../../mocks/models/saques.mock.json');


describe(('Testa A função getAllDepositosController.'), () => {
  let res = {};
  let req = {};
  before(async () => {
    sinon.stub(Saque, "findAll").callsFake(Mock.SaqueMock.findAll);
    res.status = sinon.stub()
    .returns(res);
    res.json = sinon.stub()
    .returns();
  })
    after(()=> {
        Saque.findAll.restore();
    })
    it('O status code deve retornar 200.', async () => {
      await getAllSaquesController(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true)
    });
    it('Deve retornar todos os Saques.', async () => {
        await getAllSaquesController(req, res);
        expect(res.json.calledWith(saquesMockData)).to.be.equal(true)
    });
});