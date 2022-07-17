const DepositoSchema = (sequelize, DataTypes) => {
  const DepositoTable = sequelize.define('Deposito', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    valor: DataTypes.DECIMAL,
    codCliente: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
  }, { timestamps: false });

  DepositoTable.associate = (models) => {
    DepositoTable.belongsTo(models.Cliente,
      { foreignKey: 'codCliente', as: 'cliente' }); 
  };

  return DepositoTable;
};

module.exports = DepositoSchema;