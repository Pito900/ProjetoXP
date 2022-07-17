module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClienteEAtivos', {
      codAtivo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ativos',
          key: 'codAtivo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      codCliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'codCliente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('ClienteEAtivos');
  },
};