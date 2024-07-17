module.exports = (sequelize, DataTypes) => {
  let alias = "Description";
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
  tableName:"descriptions",
  timestamps: true
};
const Description = sequelize.define(alias,cols,config);

Description.associate = models =>{
  Description.belongsTo(models.Product,{
    as:"Products",
    foreignKey:"description_id"
  })
}
return Description;
};