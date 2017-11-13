// Variables - Dependencies & Reqs
const db = require('../models');
var express = require('express');
var router = express.Router();
let user = {};

// GET - Landing page (login)
router.get('/', function(request, response, next) {
  response.render('../views/partials/login');
});

//Callback URL for github Oauth
router.get('/new', function(req, res) {
  let newObject = {
    message: 'Authentication complete, click sign in'
  }
  res.render('../views/partials/login.handlebars', newObject);
})

// //Get request for sessions when user clicks on course
router.get('/user/:userName/courses/:courseId/sessions/', function(req, res) {
  let hbsObject = {}
  let CourseId = req.params.courseId;
  hbsObject.CourseId = CourseId;
    return db.Users.findOne({
      where: {
        user_login: req.params.userName
      }
    })
    .then((result) => {
      hbsObject.user = result.dataValues;
      hbsObject.userId = result.dataValues.id;
      hbsObject.instructor = result.dataValues.instructor;
      // let userId = result.dataValues.id;
    return db.Sessions.findAll({
      where: {
        CourseId
      },
      order: [['session_date', 'ASC']],
      include: [{
        model: db.Resources,
      },
      {
        model: db.Ratings,
      },
      {
        model: db.Comments,
        order: [["createdAt", "DESC"]]
      },
      {
        model: db.Courses
      }
      ]})
    })
    .then((sessions) => {
      hbsObject.course_name = sessions[0].Course.course_name;
      hbsObject.sessions = sessions;
      console.log(hbsObject.sessions[0].Ratings[0])
      //if user has already given a rating for the session, they cannot rate again
      for (let i = 0; i < sessions.length; i++) {
        for (let j=0; j< sessions[i].Ratings.length; j++) {
          if (sessions[i].Ratings[j] === hbsObject.userId) {
            sessions[i].Ratings[j] === [];
          }
        }
      }
      res.render('../views/partials/session_card.handlebars', hbsObject)
    })
});

//gets users profile page
router.get('/user/:username', function(req, res, next) {
  let userName = req.params.username;
  let hbsObject = {};
  //finds user where username matches url parameter
  db.Users.findOne({
    where: {
      user_login: userName
    }
  })
  .then((result) => {
    //sets user to the user that logged in
    user = result.dataValues;
    hbsObject.user = user;
    hbsObject.instructor = result.dataValues.instructor;
    //returns the logged in users courses
    return db.Enrollment.findAll({
      where: {
        userId: user.id
      },
      include: [{
          model: db.Courses,
      }]
    })
  })
  .then((result) => {
    //loops through the query result to place each courses information into the courses array
    let courses = [];
    for (let i = 0; i < result.length; i++) {
      courses.push(result[i].dataValues.Course)
    }
    return courses;
  })
  .then((courses) => {
    //sends the object with the courses and user information to handelbars to render the profile page
    hbsObject.courses = courses;
    //finds all of the resources the current user has bookmarked
    return db.Starred_Resources.findAll({
      where: {
        userId: hbsObject.user.id
      },
      include: [{
        model: db.Sessions
      },
      {
        model: db.Courses
      },
      {
        model: db.Resources
      }]
    })
    })
    .then((starredResources) => {
      hbsObject.starredResources = starredResources;
      return db.Comments.findAll({
        where: {
          userId: hbsObject.user.id
        }
      })
    })
    .then((comments) => {
      hbsObject.comments = comments;
      return db.Courses.findAll({})
    })
    .then((allCourses) => {
      hbsObject.allCourses = allCourses;
      res.render('../views/partials/profileAdmin.handlebars', hbsObject)
    })
  .catch(next);
});

module.exports = router;
