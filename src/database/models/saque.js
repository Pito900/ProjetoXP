const SaqueSchema = (sequelize, DataTypes) => {
  const SaqueTable = sequelize.define("Saque",{
    codSaque: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    valor: DataTypes.DECIMAL,
    createdAt: DataTypes.DATE
  }, { timestamps: false });

  return SaqueTable;
};

module.exports = SaqueSchema;