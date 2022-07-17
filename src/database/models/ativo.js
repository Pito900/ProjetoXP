const AtivoSchema = (sequelize, DataTypes) => {
  const AtivoTabela = sequelize.define("Ativo",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    codAtivo: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    createdAt: DataTypes.DATE
  }, { timestamps: false });

  return AtivoTabela;
};

module.exports = AtivoSchema;