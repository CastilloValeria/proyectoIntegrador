module.exports = (sequelize, DataTypes) => {
  let alias = "Adress";
  let cols = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  street: {
    type: DataTypes.STRING
  },
  number: {
    type: DataTypes.INTEGER
  },
  city: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING
  },
  zip_code: {
    type: DataTypes.INTEGER
  },
  apart_number: {
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.INTEGER
  },
 createdAt:  {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
};
let config = {
  tableName:"adresses",
  timestamps:true
};
const Adress = sequelize.define(alias,cols,config);

Adress.associate = models=>{
  Adress.belongsTo(models.User,{
    as:"Users",
    foreignKey:"user_id"
  })
}
  return Adress;
};