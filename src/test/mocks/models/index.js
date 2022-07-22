const ativoMockData = require('./ativos.mock.json');

const mockFindByPk = (Instance, codAtivo) => {
  const result = Instance.filter(item => item.codAtivo === codAtivo);
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
    findByPk: async (codAtivo) => mockFindByPk(ativoMockData, codAtivo),
}

module.exports = {
  AtivoMock,
}