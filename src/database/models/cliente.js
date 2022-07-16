const ClienteSchema = (sequelize, DataTypes) => {
  const ClienteTable = sequelize.define("Cliente",{
    codCliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    saldo: DataTypes.DECIMAL
  }, { timestamps: false });

  return ClienteTable;
};

module.exports = ClienteSchema;