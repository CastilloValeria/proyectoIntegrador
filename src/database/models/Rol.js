module.exports = (sequelize, DataTypes) => {
  let alias = "Rol";
  let cols = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
};
let config = {
  tableName:"rols",
  timestamps: true
}

const Rol = sequelize.define(alias,cols,config);

Rol.associate = models =>{
  Rol.hasMany(models.User,{
    as:"Users",
    foreignKey:"rol_id"
  })
}
  return Rol;
};