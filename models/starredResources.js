module.exports = function(sequelize, DataTypes) {
  let starredResources = sequelize.define("Starred_Resources", {});

  starredResources.associate = function(models) {
    starredResources.belongsTo(models.Users);
    starredResources.belongsTo(models.Resources);
    starredResources.belongsTo(models.Courses);
    starredResources.belongsTo(models.Sessions);
  }
  
  return starredResources;
};