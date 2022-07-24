// const chai = require('chai');
// const sinon = require('sinon');
// const chaiHTTP = require('chai-http');
// chai.use(chaiHTTP);
// const { expect } = require('chai');
// const server = require('../../api')
// const { Cliente, Ativo } = require('../../database/models');
// const Mock = require('../mocks/models/index.js');

// describe(('Testando o POST /assets/newAtivo.'), () => {
//     let response;
//     describe(('Quando o usuário não preenche todos os campos do cadastro.'), () => {
//         before(async () => {
//             sinon.stub(Cliente, "findOne").callsFake(Mock.ClienteMock.findOne);
//             sinon.stub(Ativo, "findOne").callsFake(Mock.AtivoMock.findOne);
//             sinon.stub(Ativo, "create").callsFake(Mock.AtivoMock.create);
//             responseLogin = await chai.request(server)
//             .post("/login")
//             .send({
//                 email: "admin@gmail.com",
//                 password: "admin"
//             });
//             const reqBody = {
//                 ticker: "ECON15",
//                 valor: "200"
//               };
//             response = await chai.request(server)
//                 .post("/assets/newAtivo")
//                 .send(reqBody)
//                 .set("authorization", responseLogin.body.token);
//           });
//           after(()=> {
//             Ativo.create.restore();
//             Ativo.findOne.restore();
//             Cliente.findOne.restore();
//         });
//         it('O status code deve retornar 400.', async () => {
//             console.log(response.body.message)
//             expect(response).to.have.status(400)
//         });
//         it('Deve retornar uma mensagem: "qtdDisponivel" is required', async () => {
//             expect(response.body.message).to.have.equal('"qtdDisponivel" is required')
//         });
//     });
// });