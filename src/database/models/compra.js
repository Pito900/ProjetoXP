const CompraSchema = (sequelize, DataTypes) => {
  const CompraTable = sequelize.define("Compra",{
    idCompra: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idAtivo: DataTypes.INTEGER,
    qtdComprada: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL,
    codCliente: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, { timestamps: false });

  return CompraTable;
};

module.exports = CompraSchema;