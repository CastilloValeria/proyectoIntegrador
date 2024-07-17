module.exports = (sequelize, DataTypes) => {
  let alias  = "Product";
  let cols = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  titulo:{
    type: DataTypes.STRING,
    allowNull: false
  },
  discount: {
    type: DataTypes.INTEGER
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  brand_id: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.JSON,
    allowNull: false
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
  tableName:"products",
  timestamps:true
};

const Product = sequelize.define(alias,cols,config);
Product.associate = models =>{
  Product.belongsTo(models.Brand,{
    as:"brands",
    foreignKey:"brand_id"
  })
  Product.belongsToMany(models.User,{
    as:"Users",
    through:"cart",
    foreignKey: "product_id",
    otherKey:"user_id",
    timestamps:true
  })
  Product.hasMany(models.Image,{
    as:"Images",
    foreignKey:"product_id",
  })
}
  return Product;
};