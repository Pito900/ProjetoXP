const clienteMockData = require('./clientes.mock.json')
const vendaMockData = require('./vendas.mock.json')
const ativoMockData = require('./ativos.mock.json');
const compraMockData = require('./compras.mock.json')
const depositoMockData = require('./depositos.mock.json')
const saqueMockData = require('./saques.mock.json');
const { createClient } = require('../../../services/clienteService');

const mockFindOne = (Instance, where) => {
  if (!where) {
        return Instance[0];
  }
  const whereFields = Object.keys(where);
  const result = Instance.filter(item => {
    const onlyMatch = whereFields.map( key => item[key] === where[key]);
    return onlyMatch.filter(v=>v).length === whereFields.length;
  });

  return result[0];
}

const mockFindIDByAtivo = (Instance, id) => {
  const result = Instance.filter(item => item.codAtivo === id);
  return result[0];
}
const mockFindIDByCliente = (Instance, id) => {
  const result = Instance.filter(item => item.codCliente === id);
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

const mockCreateAtivo = (Instance, data) => {
  if (!data) {
    return;
  }
  const newData = data;
  if (Instance[0].codAtivo) {
    newData.codAtivo = Date.now();
  }
  Instance.push(newData);
  return newData;
};

const mockCreateCliente = (Instance, data) => {
  if (!data) {
    return;
  }
  const newData = data;
  if (Instance[0].codCliente) {
    newData.codCliente = Date.now();
  }
  Instance.push(newData);
  return newData;
};

const AtivoMock = {
  findAll: async () => ativoMockData,
  create: async (data) => mockCreateAtivo(ativoMockData, data),
  findByPk: async (codAtivo) => mockFindIDByAtivo(ativoMockData, codAtivo),
  findOne: async ({ where }) => mockFindOne(ativoMockData, where),
};

const ClienteMock = {
  findOne: async ({ where }) => mockFindOne(clienteMockData, where),
  create: async (data) => mockCreateCliente(clienteMockData, data),
  findAll: async () => clienteMockData,
  findByPk: async (codCliente) => mockFindIDByCliente(clienteMockData, codCliente),
  update: async (codCliente, valor) => createClientMock(clienteMockData, codCliente, valor),
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