module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('ClienteEAtivos',
      [{
        idAtivo: 1,
        codCliente: 2,
      },
      {
        idAtivo: 1,
        codCliente: 1,
      },
      {
        idAtivo: 3,
        codCliente: 2,
      },
      {
        idAtivo: 3,
        codCliente: 1,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('ClienteEAtivos', null, {});
  },
};
