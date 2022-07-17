const AtivoSchema = (sequelize, DataTypes) => {
  const AtivoTabela = sequelize.define('Ativo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    codAtivo: DataTypes.STRING,
    qtdDisponivel: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL,
  }, { timestamps: false });

  AtivoTabela.associate = (models) => {
    AtivoTabela.hasMany(models.Compra,
      { foreignKey: 'id', as: 'compras' });
    AtivoTabela.hasMany(models.Venda,
      { foreignKey: 'id', as: 'vendas' });
  };
  return AtivoTabela;
};

module.exports = AtivoSchema;