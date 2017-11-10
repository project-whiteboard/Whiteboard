module.exports = function(sequelize, DataTypes) {
  let courses = sequelize.define("Courses", {
    course_instructor: DataTypes.STRING,
    course_name: DataTypes.STRING,
    course_desc: DataTypes.STRING,
    course_date: DataTypes.STRING,
    course_time_start: DataTypes.STRING,
    course_time_end: DataTypes.STRING
  });
  return courses;
};
