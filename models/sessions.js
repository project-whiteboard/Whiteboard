module.exports = function(sequelize, DataTypes) {
  let sessions = sequelize.define("Sessions", {
    session_name: DataTypes.STRING,
    session_subject: DataTypes.STRING,
    session_date: DataTypes.STRING,
    session_desc: DataTypes.STRING,
    session_time: DataTypes.INTEGER,
    session_duration: DataTypes.INTEGER,
    session_rating: {
      type: DataTypes.FLOAT,
      len: 3
    }
  });

  sessions.associate = function(models) {
    sessions.belongsTo(models.Courses);
    sessions.hasMany(models.Resources);
    sessions.hasMany(models.Ratings);
    sessions.hasMany(models.Comments);
  }
  return sessions;
};

