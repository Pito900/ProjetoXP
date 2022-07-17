module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ativos', {
      codAtivo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ticker: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      qtdDisponivel: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Ativos');
  },
};