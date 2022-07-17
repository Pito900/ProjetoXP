const AtivoSchema = (sequelize, DataTypes) => {
  const AtivoTabela = sequelize.define('Ativo', {
    codAtivo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ticker: DataTypes.STRING,
    qtdDisponivel: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL,
  }, { timestamps: false });

  AtivoTabela.associate = (models) => {
    AtivoTabela.hasMany(models.Compra,
      { foreignKey: 'codAtivo', as: 'compras' });
    AtivoTabela.hasMany(models.Venda,
      { foreignKey: 'codAtivo', as: 'vendas' });
  };
  return AtivoTabela;
};

module.exports = AtivoSchema;