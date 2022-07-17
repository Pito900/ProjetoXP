module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idAtivo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ativos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      qtdComprada: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      codCliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id',
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
    await queryInterface.dropTable('Compras');
  },
};