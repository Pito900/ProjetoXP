const VendaSchema = (sequelize, DataTypes) => {
  const VendaTable = sequelize.define("Venda",{
    idVenda: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idAtivo: DataTypes.INTEGER,
    qtdComprada: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL,
    codCliente: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, { timestamps: false });

  return VendaTable;
};

module.exports = VendaSchema;