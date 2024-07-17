module.exports = (sequelize, DataTypes) => {
  let alias = "Image";
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
  path: {
    type: DataTypes.STRING
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
  tableName:"Images",
  timestamps:true
};
const Image = sequelize.define(alias,cols,config);

Image.associate = models=>{
  Image.belongsTo(models.Product,{
    as:"Products",
    foreignKey:"product_id"
  })
}
  return Image;
};