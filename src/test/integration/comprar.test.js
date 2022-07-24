const chai = require('chai');
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const { expect } = require('chai');
const server = require('../../api')
const { Venda, Ativo, Cliente } = require('../../database/models');
const Mock = require('../mocks/models/index.js');

describe(('Testando o POST /investimentos/comprar.'), () => {
    describe(('Quando o usuário não preenche todos os campos do cadastro.'), () => {
        let response;
        before(async () => {
            sinon.stub(Cliente, "findOne").callsFake(Mock.ClienteMock.findOne);
            sinon.stub(Venda, "findAll").callsFake(Mock.VendaMock.findAll);
            sinon.stub(Ativo, "findByPk").callsFake(Mock.AtivoMock.findByPk);
            responseLogin = await chai.request(server)
            .post("/login")
            .send({
                email: "admin@gmail.com",
                password: "admin"
            });
            let reqBody = {
                codAtivo: 2,
                qtdAtivo: 100
              };
            response = await chai.request(server)
                .post("/investimentos/comprar")
                .send(reqBody)
                .set("authorization", responseLogin.body.token);
          });
          after(()=> {
            Cliente.findOne.restore();
            Venda.findAll.restore()
            Ativo.findByPk.restore();
        });
        it('O status code deve retornar 400.', async () => {
            console.log(response.body.message)
            expect(response).to.have.status(400)
        });
        it('Deve retornar uma mensagem: "codCliente" is required', async () => {
            expect(response.body.message).to.have.equal('"codCliente" is required')
        });
    });
});