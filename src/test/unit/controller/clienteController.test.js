const { expect } = require('chai');
const sinon = require('sinon');
const { getClienteByCodClienteController,
countClientInfosController,
createClientController,
 } = require('../../../controllers/clienteController');
const { Cliente, Ativo, Compra, Venda } = require('../../../database/models');
const Mock = require('../../mocks/models/index.js');

describe(('Testa as funções do clienteController'), async ()=> { 
    let res = {};
    let req = {};
  describe(('Testando a função do clienteController que gera os dados do endpoint GET /assets/ativos/:codAtivo.'), () => {
        before(async () => {
            sinon.stub(Cliente, "findByPk").callsFake(Mock.ClienteMock.findByPk);
            sinon.stub(Compra, "findAll").callsFake(Mock.CompraMock.findAll);
            sinon.stub(Ativo, "findByPk").callsFake(Mock.AtivoMock.findByPk);
            sinon.stub(Venda, "findAll").callsFake(Mock.VendaMock.findAll);
            req.params = {
                codCliente: 2,
      };
    res.status = sinon.stub()
    .returns(res);
    res.json = sinon.stub()
    .returns();
  })
    after(()=> {
      Cliente.findByPk.restore();
      Compra.findAll.restore();
      Ativo.findByPk.restore();
      Venda.findAll.restore();
    })
    it('O status code deve retornar 200', async () => {
         await getClienteByCodClienteController(req, res);
         expect(res.status.calledWith(200)).to.be.equal(true)

        });
        it('Deve retornar um objeto com o codCliente, email e uma array com seus ativos.', async () => {
         await getClienteByCodClienteController(req, res);
         expect(res.json.calledWith({
             "codCliente": 2,
                "email": "francisco@gmail.com",
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
            })).to.be.equal(true)
     });
  });
  describe(('Testando a função do clienteController que gera os dados do endpoint GET /conta/:codCliente.'), () => {
  describe(('Quando o codCliente está correto (é o logado).'), () => {
        before(async () => {
            sinon.stub(Cliente, "findByPk").callsFake(Mock.ClienteMock.findByPk);
            req.params = {
                codCliente: 2,
            };
            res.status = sinon.stub()
            .returns(res);
            res.json = sinon.stub()
            .returns();
        })
        after(()=> {
            Cliente.findByPk.restore();
        })
     it('O status code deve retornar 200', async () => {
         await countClientInfosController(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true)

    });
    it('Deve retornar um objeto com as informações da conta do cliente.', async () => {
        await countClientInfosController(req, res);
        expect(res.json.calledWith({
            "codCliente": 2,
            "name": "Francisco",
            "email": "francisco@gmail.com",
            "image": "https://img2.gratispng.com/20180404/ire/kisspng-computer-icons-physician-login-medicine-user-avatar-5ac45a4d44fe99.2456489015228176132826.jpg",
            "saldo": "1000000"
        })).to.be.equal(true)
     });
    });
  })
})