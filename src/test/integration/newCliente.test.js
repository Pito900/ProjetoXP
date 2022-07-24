const chai = require('chai');
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const { expect } = require('chai');
const server = require('../../api')
const { Cliente } = require('../../database/models');
const Mock = require('../mocks/models/index.js');

describe(('Testando o POST /newCliente.'), () => {
    let response;
    before(async () => {
        sinon.stub(Cliente, "findOne").callsFake(Mock.ClienteMock.findOne);
        sinon.stub(Cliente, "create").callsFake(Mock.ClienteMock.create);
      })
    after(()=> {
        Cliente.findOne.restore();
        Cliente.create.restore();
    })
    describe(('Quando o usuário não preenche todos os campos do cadastro.'), () => {
        let response;
        before(async () => {
            const reqBody = {
                name: 'Robson',
                email: 'robson@gmail.com',
                saldo: 2000,
            }
            response = await chai.request(server)
                .post("/newCliente")
                .send(reqBody)
          })
        it('O status code deve retornar 400.', async () => {
            expect(response).to.have.status(400)
        });
        it('Deve retornar uma mensagem: "image" is required', async () => {
            console.log(response.body.message)
            expect(response.body.message).to.have.equal('"image" is required')
        });
    });


    describe(('Quando o depósito inicial é menor ou igual a zero está cadastrado.'), () => {
        let response;
        before(async () => {
            const reqBody = {
                name: 'Robson',
                email: 'robson@gmail.com',
                image: 'fake',
                saldo: 0,
            }
            response = await chai.request(server)
                .post("/newCliente")
                .send(reqBody)
          })

        it('O status code deve retornar 422.', async () => {
            expect(response).to.be.status(422)
        });
        it('Deve retornar uma mensagem: "saldo" must be greater than 0.', async () => {
            expect(response.body.message).to.have.equal('"saldo" must be greater than 0')
        });
    });

    describe(('Cadastro do cliente feito com sucesso.'), () => {
        before(async () => {
            const reqBody = {
                name: 'Robson',
                email: 'robson@gmail.com',
                image: 'fakeImage',
                saldo: 3334,
            }
            response = await chai.request(server)
                .post("/newCliente")
                .send(reqBody)
          })

        it('O status code deve retornar 201.', async () => {
            expect(response).to.be.status(201)
        });
        it('Deve retornar um token.', async () => {
            expect(response.body).to.have.property('token')
        });
    })
});