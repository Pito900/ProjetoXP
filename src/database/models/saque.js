const SaqueSchema = (sequelize, DataTypes) => {
  const SaqueTable = sequelize.define('Saque', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    valor: DataTypes.DECIMAL,
    codCliente: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
  }, { timestamps: false });

  SaqueTable.associate = (models) => {
    SaqueTable.belongsTo(models.Cliente,
      { foreignKey: 'codCliente', as: 'cliente' }); 
  };

  return SaqueTable;
};

module.exports = SaqueSchema;