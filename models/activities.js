module.exports = function(sequelize, DataTypes) {
  let activities = sequelize.define("Activities", {
    activity_name: DataTypes.STRING,
    user_login: DataTypes.STRING,
    user_avatar: DataTypes.STRING
  });

  activities.associate = function(models) {
    activities.belongsTo(models.Sessions);
    activities.belongsTo(models.Courses);
  }
  
  return activities;
};