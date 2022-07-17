module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Ativos',
      [{
        id: 1,
        codAtivo: 'PETR4',
        qtdDisponivel: 320,
        valor: 200,
      },
      {
        id: 2,
        codAtivo: 'VALE4',
        qtdDisponivel: 200,
        valor: 200,
      },
      {
        id: 3,
        codAtivo: 'XPBR31',
        qtdDisponivel: 400,
        valor: 200,
      },
      {
        id: 4,
        codAtivo: 'ELET3',
        qtdDisponivel: 300,
        valor: 200,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Ativos', null, {});
  },
};
