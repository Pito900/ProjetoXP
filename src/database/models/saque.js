const SaqueSchema = (sequelize, DataTypes) => {
  const SaqueTable = sequelize.define("Saque",{
    codSaque: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    valor: DataTypes.DECIMAL,
    createdAt: DataTypes.DATE
  }, { timestamps: false });

  SaqueTable.associate = (models) => {
    SaqueTable.belongsTo(models.Cliente, //definindo a associação hasMany da tabela users com a blogpost
      { foreignKey: 'codCliente', as: 'cliente'}) 
  }

  return SaqueTable;
};

module.exports = SaqueSchema;