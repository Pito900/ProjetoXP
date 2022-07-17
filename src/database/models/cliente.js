const ClienteSchema = (sequelize, DataTypes) => {
  const ClienteTable = sequelize.define("Cliente",{
    codCliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    saldo: DataTypes.DECIMAL
  }, { timestamps: false });

  ClienteTable.associate = (models) => {
    ClienteTable.hasMany(models.Deposito,
      { foreignKey: 'codCliente', as: 'depositos'})
    ClienteTable.hasMany(models.Saque,
      { foreignKey: 'codCliente', as: 'saques'}) 
  }


  return ClienteTable;
};

module.exports = ClienteSchema;