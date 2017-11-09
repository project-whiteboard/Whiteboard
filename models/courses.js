module.exports = function(sequelize, DataTypes) {
  let courses = sequelize.define("Courses", {
    course_instructor: DataTypes.STRING,
    course_name: DataTypes.STRING,
    course_desc: DataTypes.STRING,
    course_time: DataTypes.STRING
  });
  return courses;
};
