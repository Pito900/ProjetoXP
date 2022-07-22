const { expect } = require('chai');
const sinon = require('sinon');
const { gettingAtivoByCodAtivoController } = require('../../controllers/ativosController');

describe('Testando o controller do endpoint GET /assets/ativos/:codAtivo', () => {
    describe(('Quando não há o ativo na base de dados'), () => {
        const res = {};
        const req = {};
    
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
            const result = await gettingAtivoByCodAtivoController(req, res);
            expect(res.json.calledWith({ message: 'Ativo não encontrado.' })).to.be.equal(true)
        });
    });
});