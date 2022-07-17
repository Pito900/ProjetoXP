const DepositoSchema = (sequelize, DataTypes) => {
  const DepositoTable = sequelize.define("Deposito",{
    codDeposito: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    valor: DataTypes.DECIMAL,
    createdAt: DataTypes.DATE
  }, { timestamps: false });

  return DepositoTable;
};

module.exports = DepositoSchema;