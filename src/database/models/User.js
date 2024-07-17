
module.exports = (sequelize, DataTypes) => {
  let alias = "User";
  let cols={
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING,
    allowNull:false
  },
  email: {
    type: DataTypes.STRING,
    allowNull:false
  },
  password:{
    type: DataTypes.STRING,
    allowNull:false
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull:false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull:true
  },
  rol_id: {
    type: DataTypes.INTEGER
  },
  avatar: {
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
  tableName: "users",
  timestamps: true
}

const User = sequelize.define(alias,cols,config);

User.associate = models=>{
  User.hasMany(models.Adress,{
    as:"Adress",
    foreignKey:"user_id"
  })
  User.hasMany(models.Contact,{
    as:"Contacts",
    foreignKey:"user_id"
  })
 
  User.belongsTo(models.Rol,{
      as:"Rols",
      foreignKey:"rol_id"
  })

  User.belongsToMany(models.Product,{
    as:"Products",
    through:"cart",
    foreignKey: "user_id",
    otherKey:"product_id",
    timestamps:true
  })

}
  return User;
};