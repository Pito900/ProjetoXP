module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Saques',
      [{
        codSaque: 1,
        valor: 1000,
        codCliente: 2,
        createdAt:  new Date('2022-06-01T19:58:00.000Z'),
      },
      {
        codSaque: 2,
        valor: 2000,
        codCliente: 1,
        createdAt:  new Date('2022-01-01T19:51:00.000Z'),
      },
      {
        codSaque: 3,
        valor: 3000,
        codCliente: 2,
        createdAt:  new Date('2022-05-01T19:18:00.000Z'),
      },
      {
        codSaque: 4,
        valor: 50000,
        codCliente: 1,
        createdAt:  new Date('2022-03-01T19:02:00.000Z'),
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Saques', null, {});
  },
};
