const ativoMockData = require('./ativos.mock.json');
const clienteMockData = require('./clientes.mock.json')
const vendaMockData = require('./vendas.mock.json')
const compraMockData = require('./compras.mock.json')
const depositoMockData = require('./depositos.mock.json')
const saqueMockData = require('./saques.mock.json')



const mockFindIDByAtivo = (Instance, id) => {
  const result = Instance.filter(item => item.codAtivo === id);
  return result[0];
}

const mockFindByPk = (Instance, id) => {
  const result = Instance.filter(item => item.id === id);
  return result[0];
}

const mockCreate = (Instance, data) => {
    if (!data) {
      return;
    }
    const newData = data;
    if (Instance[0].id) {
      newData.id = Date.now();
    }
    Instance.push(newData);
    return newData;
};

const AtivoMock = {
    create: async (data) => mockCreate(ativoMockData, data),
    findAll: async () => ativoMockData,
    findByPk: async (codAtivo) => mockFindIDByAtivo(ativoMockData, codAtivo),
};

const ClienteMock = {
  create: async (data) => mockCreate(clienteMockData, data),
  findAll: async () => clienteMockData,
  findByPk: async (codCliente) => mockFindByPk(clienteMockData, codCliente),
};

const VendaMock = {
  create: async (data) => mockCreate(vendaMockData, data),
  findAll: async () => vendaMockData,
  findByPk: async (id) => mockFindByPk(vendaMockData, id),
};

const CompraMock = {
  create: async (data) => mockCreate(compraMockData, data),
  findAll: async () => compraMockData,
  findByPk: async (id) => mockFindByPk(compraMockData, id),
};

const DepositoMock = {
  create: async (data) => mockCreate(depositoMockData, data),
  findAll: async () => depositoMockData,
  findByPk: async (id) => mockFindByPk(depositoMockData, id),
};

const SaqueMock = {
  create: async (data) => mockCreate(saqueMockData, data),
  findAll: async () => saqueMockData,
  findByPk: async (id) => mockFindByPk(saqueMockData, id),
};

module.exports = {
  AtivoMock,
  ClienteMock,
  VendaMock,
  CompraMock,
  DepositoMock,
  SaqueMock,
}