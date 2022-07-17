const ClienteSchema = (sequelize, DataTypes) => {
  const ClienteTable = sequelize.define('Cliente', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    saldo: DataTypes.DECIMAL,
  }, { timestamps: false });

  ClienteTable.associate = (models) => {
    ClienteTable.hasMany(models.Deposito,
      { foreignKey: 'codCliente', as: 'depositos' });
    ClienteTable.hasMany(models.Saque,
      { foreignKey: 'codCliente', as: 'saques' });
    ClienteTable.hasMany(models.Compra,
      { foreignKey: 'codCliente', as: 'compras' });
    ClienteTable.hasMany(models.Compra,
      { foreignKey: 'codCliente', as: 'vendas' });
  };

  return ClienteTable;
};

module.exports = ClienteSchema;