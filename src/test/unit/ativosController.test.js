const { expect } = require('chai');
const sinon = require('sinon');
const { gettingAtivoByCodAtivoController } = require('../../controllers/ativosController');

describe('Testando o controller do endpoint GET /assets/ativos/:codAtivo', () => {
    const res = {};
    const req = {};
    describe(('Quando não há o ativo na base de dados'), () => {
        before(() => {
            req.params = {
                codAtivo: 65478916,
              };
            res.status = sinon.stub()
              .returns(res);
            res.json = sinon.stub()
              .returns();
        })
        it('O status code deve retornar 404', async () => {
            await gettingAtivoByCodAtivoController(req, res);
            expect(res.status.calledWith(404)).to.be.equal(true)

        });
        it('Deve retornar uma mensagem "Ativo não encontrado."', async () => {
            await gettingAtivoByCodAtivoController(req, res);
            expect(res.json.calledWith({ message: 'Ativo não encontrado.' })).to.be.equal(true)
        });
    });
    describe(('Quando há o ativo na base de dados'), () => {
        before(() => {
            req.params = {
                codAtivo: 1,
              };
            res.status = sinon.stub()
              .returns(res);
            res.json = sinon.stub()
              .returns();
        })
        it('O status code deve retornar 200', async () => {
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