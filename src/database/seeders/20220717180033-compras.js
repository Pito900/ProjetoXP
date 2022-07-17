module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Compras',
      [{
        id: 1,
        codAtivo: 2,
        qtdComprada: 12,
        codCliente: 2,
        createdAt: new Date('2022-04-01T11:25:00.000Z'),
      },
      {
        id: 2,
        codAtivo: 1,
        qtdComprada: 12,
        codCliente: 1,
        createdAt: new Date('2022-04-01T11:25:00.000Z'),
      },
      {
        id: 3,
        codAtivo: 4,
        qtdComprada: 14,
        codCliente: 1,
        createdAt: new Date('2022-05-01T19:18:00.000Z'),
      },
      {
        id: 4,
        codAtivo: 3,
        qtdComprada: 20,
        codCliente: 2,
        createdAt: new Date('2022-03-01T19:02:00.000Z'),
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Compras', null, {});
  },
};
