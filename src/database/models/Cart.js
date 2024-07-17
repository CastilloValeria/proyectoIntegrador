module.exports = (sequelize, DataTypes) => {
  let alias = "Cart";
  let cols = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  count: {
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  product_id: {
    type: DataTypes.INTEGER
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
  tableName:"carts",
  timestamps:true
};
const Cart = sequelize.define(alias,cols,config);
Cart.associate = models => {
  Cart.belongsTo(models.Product,{
    as:"product",
    foreignKey:"product_id"
  })
  Cart.belongsTo(models.User,{
    as:"user",
    foreignKey:"user_id"
  })
}
  return Cart;
};