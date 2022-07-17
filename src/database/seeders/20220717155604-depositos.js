module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Depositos',
      [{
        id: 1,
        valor: 10000,
        codCliente: 2,
        createdAt: new Date('2022-01-01T19:58:00.000Z'),
      },
      {
        id: 2,
        valor: 5000,
        codCliente: 1,
        createdAt: new Date('2022-02-01T19:51:00.000Z'),
      },
      {
        id: 3,
        valor: 2000,
        codCliente: 1,
        createdAt: new Date('2022-04-01T19:18:00.000Z'),
      },
      {
        id: 4,
        valor: 6000,
        codCliente: 1,
        createdAt: new Date('2022-05-01T19:02:00.000Z'),
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Depositos', null, {});
  },
};
