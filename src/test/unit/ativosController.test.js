const { expect } = require('chai');
const sinon = require('sinon');
const { gettingAtivoByCodAtivoController, listarTodasOsAtivosController } = require('../../controllers/ativosController');
const { Ativo, Cliente, Compra, Venda } = require('../../database/models');
const Mock = require('../mocks/models/index.js');
const ativoMockData = require('../mocks/models/ativos.mock.json');


describe('Testando a função do controller que gera os dados do endpoint GET /assets/ativos/:codAtivo.', () => {
    let res = {};
    let req = {};
    
    describe(('Quando não há o ativo na base de dados.'), () => {
      before(async () => {
        sinon.stub(Ativo, "findByPk").callsFake(Mock.AtivoMock.findByPk);
        req.params = {
          codAtivo: 123412343,
        };
        res.status = sinon.stub()
        .returns(res);
        res.json = sinon.stub()
        .returns();
      })
        after(()=> {
          Ativo.findByPk.restore();
        })
        it('O status code deve retornar 404.', async () => {
          await gettingAtivoByCodAtivoController(req, res);
          expect(res.status.calledWith(404)).to.be.equal(true)
        });
        it('Deve retornar uma mensagem "Ativo não encontrado."', async () => {
            await gettingAtivoByCodAtivoController(req, res);
            expect(res.json.calledWith({ message: 'Ativo não encontrado.' })).to.be.equal(true)
        });
    });
    describe(('Quando há o ativo na base de dados'), () => {
      before(async () => {
          sinon.stub(Ativo, "findByPk").callsFake(Mock.AtivoMock.findByPk);
          req.params = {
            codAtivo: 1,
          };
          res.status = sinon.stub()
          .returns(res);
          res.json = sinon.stub()
          .returns();
          })
          after(()=> {
            Ativo.findByPk.restore();
          })
        it('O status code deve retornar 200.', async () => {
          await gettingAtivoByCodAtivoController(req, res);
          expect(res.status.calledWith(200)).to.be.equal(true)

        });
        it('Deve retornar um objeto, do ativo especificado, com dados corretos.', async () => {
            await gettingAtivoByCodAtivoController(req, res);
            expect(res.json.calledWith({
                "codAtivo": 1,
                "ticker": "PETR4",
                "qtdDisponivel": 320,
                "valor": 250
            })).to.be.equal(true)
        });
    });
});

describe('Testando a função do controller que gera os dados do endpoint GET /assets.', () => {
    const res = {};
    const req = {};
    describe(('Quando a base está completa.'), () => {
      before(async () => {
        sinon.stub(Cliente, "findAll").callsFake(Mock.ClienteMock.findAll);
        sinon.stub(Compra, "findAll").callsFake(Mock.CompraMock.findAll);
        sinon.stub(Ativo, "findByPk").callsFake(Mock.AtivoMock.findByPk);
        sinon.stub(Venda, "findAll").callsFake(Mock.VendaMock.findAll);
        sinon.stub(Ativo, "findAll").callsFake(Mock.AtivoMock.findAll);
        res.status = sinon.stub()
        .returns(res);
        res.json = sinon.stub()
        .returns();
      })
        after(()=> {
          Cliente.findAll.restore();
          Compra.findAll.restore();
          Ativo.findByPk.restore();
        })
        it('O status code deve retornar 200', async () => {
           const a = await listarTodasOsAtivosController(req, res);
           console.log(a);
            expect(res.status.calledWith(200)).to.be.equal(true)

        });
        it('Deve retornar um objeto, do ativo especificado, com dados corretos.', async () => {
            await listarTodasOsAtivosController(req, res);
            expect(res.json.calledWith({
                "Corretora": ativoMockData,
                "Carteiras": [
                  {
                    "codCliente": 1,
                    "ativos": [
                      {
                        "codAtivo": 1,
                        "ticker": "PETR4",
                        "qtdAtivo": 13,
                        "valor": 250
                      },
                      {
                        "codAtivo": 4,
                        "ticker": "ELET3",
                        "qtdAtivo": 11,
                        "valor": 270
                      }
                    ]
                  },
                  {
                    "codCliente": 2,
                    "ativos": [
                      {
                        "codAtivo": 2,
                        "ticker": "VALE4",
                        "qtdAtivo": 8,
                        "valor": 200
                      },
                      {
                        "codAtivo": 3,
                        "ticker": "XPBR31",
                        "qtdAtivo": 14,
                        "valor": 300
                      }
                    ]
                  }
                ],
            })).to.be.equal(true)
        });
    });
});