module.exports = function(sequelize, DataTypes) {
  let enrollment = sequelize.define("Enrollment", {});
  // enrollment.belongsTo(models.courses);
  // enrollment.belongsTo(models.users);

  enrollment.associate = function(models) {
    enrollment.belongsTo(models.Users);
    enrollment.belongsTo(models.Courses);
  }
  
  return enrollment;
};