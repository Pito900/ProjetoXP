const chai = require('chai');
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const { expect } = require('chai');
const server = require('../../api')
const { Cliente } = require('../../database/models');
const Mock = require('../mocks/models/index.js');

describe(('Testando o POST /login.'), () => {
    before(async () => {
        sinon.stub(Cliente, "findOne").callsFake(Mock.ClienteMock.findOne);
      })
    after(()=> {
        Cliente.findOne.restore();
    })
    describe(('Quando o usuário não é cadastrado.'), () => {
        let response;
        before(async () => {
            const reqBody = {
                email: 'asdfag@gmail.com',
                password: 'asdgahads'
            }
            response = await chai.request(server)
                .post("/login")
                .send(reqBody)
          })
        it('O status code deve retornar 400.', async () => {
            expect(response).to.have.status(400)
        });
        it('Deve retornar uma mensagem: "Email ou Senha está incorretos.".', async () => {
            expect(response.body.message).to.have.equal("Email ou Senha está incorretos.")
        });
    });

    describe(('Quando o usuário está cadastrado.'), () => {
        let response;
        before(async () => {
            const reqBody = {
                email: "francisco@gmail.com",
                password: "123456"
            }
            response = await chai.request(server)
                .post("/login")
                .send(reqBody)
          })

        it('O status code deve retornar 200.', async () => {
            expect(response).to.be.status(200)
        });
        it('Deve retornar um token.', async () => {
            expect(response.body).to.have.property('token')
        });
    })
});