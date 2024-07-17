module.exports = (sequelize, DataTypes) => {
  let alias = "Brand";
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
  tableName:"brands",
  timestamps:true
};
const Brand = sequelize.define(alias,cols,config);
Brand.associate = models =>{
  Brand.hasMany(models.Product,{
    as:"Products",
    foreignKey:"brand_id"
  })
}
  return Brand;
};