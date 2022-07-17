module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Depositos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      codCliente: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'codCliente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Depositos');
  },
};