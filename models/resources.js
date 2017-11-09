module.exports = function(sequelize, DataTypes) {
  let resources = sequelize.define("Resources", {
    resource_url: DataTypes.STRING,
    resource_title: DataTypes.STRING,
    resource_desc: DataTypes.STRING,
    user_login: DataTypes.STRING,
    instructor: DataTypes.BOOLEAN
  });

  resources.associate = function(models) {
    resources.belongsTo(models.Sessions);
    resources.belongsTo(models.Users);
    resources.belongsTo(models.Courses);
  }
  
  return resources;
};