module.exports = function(sequelize, DataTypes) {
  let ratings = sequelize.define("Ratings", {
    rating: DataTypes.INTEGER,
  });

  ratings.associate = function(models) {
    ratings.belongsTo(models.Users);
    ratings.belongsTo(models.Sessions);
  }
  
  return ratings;
};