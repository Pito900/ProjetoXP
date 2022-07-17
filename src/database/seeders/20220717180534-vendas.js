module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Vendas',
      [{
        id: 1,
        idAtivo: 4,
        qtdVendida: 3,
        codCliente: 1,
        createdAt: new Date('2022-01-01T11:25:00.000Z'),
      },
      {
        id: 2,
        idAtivo: 1,
        qtdVendida: 5,
        codCliente: 1,
        createdAt: new Date('2022-02-01T11:25:00.000Z'),
      },
      {
        id: 3,
        idAtivo: 3,
        qtdVendida: 6,
        codCliente: 2,
        createdAt: new Date('2022-03-01T19:18:00.000Z'),
      },
      {
        id: 4,
        idAtivo: 2,
        qtdVendida: 4,
        codCliente: 2,
        createdAt: new Date('2022-03-01T19:02:00.000Z'),
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Vendas', null, {});
  },
};
