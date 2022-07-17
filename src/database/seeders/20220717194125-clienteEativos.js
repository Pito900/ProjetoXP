module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('ClienteEAtivos',
      [{
        codAtivo: 1,
        codCliente: 2,
      },
      {
        codAtivo: 1,
        codCliente: 1,
      },
      {
        codAtivo: 3,
        codCliente: 2,
      },
      {
        codAtivo: 3,
        codCliente: 1,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('ClienteEAtivos', null, {});
  },
};
