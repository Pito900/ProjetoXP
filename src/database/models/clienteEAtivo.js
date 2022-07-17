const ClienteEAtivoSchema = (sequelize, DataTypes) => {
    const ClienteEAtivoTabela = sequelize.define('ClienteEativo', {
      codAtivo: DataTypes.INTEGER,
      codCliente: DataTypes.INTEGER,
    }, { timestamps: false, TableName: 'ClienteEativo' });

    ClienteEAtivoTabela.associate = (models) => { // desta forma fazemos a associação de N:N
        models.Ativo.belongsToMany(models.Cliente, { 
        as: 'cliente',
        foreignKey: 'codAtivo',
        through: ClienteEAtivoTabela,
        otherKey: 'codCliente',
        }) 
        
        models.Cliente.belongsToMany(models.Ativo, { 
        as: 'ativo',
        foreignKey: 'codCliente',
        through: ClienteEAtivoTabela,
        otherKey: 'idAtivo',
        }) 
}
  
    return ClienteEAtivoTabela;
  };
  
  module.exports = ClienteEAtivoSchema;