'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ativos', {
      idAtivo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codAtivo: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      qtdDisponivel: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ativos');
  }
};