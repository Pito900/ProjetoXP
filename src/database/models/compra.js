const CompraSchema = (sequelize, DataTypes) => {
  const CompraTable = sequelize.define('Compra', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    codAtivo: DataTypes.INTEGER,
    qtdAtivo: DataTypes.INTEGER,
    codCliente: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
  }, { timestamps: false });

  CompraTable.associate = (models) => {
    CompraTable.belongsTo(models.Ativo,
      { foreignKey: 'codAtivo', as: 'ativo' });   
    CompraTable.belongsTo(models.Cliente,
      { foreignKey: 'codCliente', as: 'cliente' });
  };

  return CompraTable;
};

module.exports = CompraSchema;