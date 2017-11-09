module.exports = function(sequelize, DataTypes) {
  let comments = sequelize.define("Comments", {
    comment_text: DataTypes.STRING,
    user_login: DataTypes.STRING,
    user_avatar: DataTypes.STRING
  });

  comments.associate = function(models) {
    comments.belongsTo(models.Sessions);
    comments.belongsTo(models.Users);
    comments.belongsTo(models.Courses);
  }
  
  return comments;
};