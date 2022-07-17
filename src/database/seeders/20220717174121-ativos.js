module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Ativos',
      [{
        codAtivo: 1,
        ticker: 'PETR4',
        qtdDisponivel: 320,
        valor: 200,
      },
      {
        codAtivo: 2,
        ticker: 'VALE4',
        qtdDisponivel: 200,
        valor: 200,
      },
      {
        codAtivo: 3,
        ticker: 'XPBR31',
        qtdDisponivel: 400,
        valor: 200,
      },
      {
        codAtivo: 4,
        ticker: 'ELET3',
        qtdDisponivel: 300,
        valor: 200,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Ativos', null, {});
  },
};
