module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Vendas',
      [{
        id: 1,
        codAtivo: 4,
        qtdAtivo: 3,
        codCliente: 1,
        createdAt: new Date('2022-01-01T11:25:00.000Z'),
      },
      {
        id: 2,
        codAtivo: 1,
        qtdAtivo: 5,
        codCliente: 1,
        createdAt: new Date('2022-02-01T11:25:00.000Z'),
      },
      {
        id: 3,
        codAtivo: 3,
        qtdAtivo: 6,
        codCliente: 2,
        createdAt: new Date('2022-03-01T19:18:00.000Z'),
      },
      {
        id: 4,
        codAtivo: 2,
        qtdAtivo: 4,
        codCliente: 2,
        createdAt: new Date('2022-03-01T19:02:00.000Z'),
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Vendas', null, {});
  },
};
