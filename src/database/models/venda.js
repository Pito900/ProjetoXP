const VendaSchema = (sequelize, DataTypes) => {
  const VendaTable = sequelize.define('Venda', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    codAtivo: DataTypes.INTEGER,
    qtdAtivo: DataTypes.INTEGER,
    codCliente: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
  }, { timestamps: false });

  VendaTable.associate = (models) => {
    VendaTable.belongsTo(models.Ativo,
      { foreignKey: 'codAtivo', as: 'ativov' });   
      VendaTable.belongsTo(models.Cliente,
      { foreignKey: 'codCliente', as: 'clientev' });
  };
  return VendaTable;
};

module.exports = VendaSchema;