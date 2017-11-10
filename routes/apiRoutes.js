// Variables - Dependencies & Reqs
const db = require('../models');
var express = require('express');
var router = express.Router();
let user = {};

//Route users are sent to for user creation
router.post('/api/users', function(req, res) {
  //query to see if user exists
  db.Users.findAll({
    where: {
      user_login: req.body.login
    }
  })
  .then((result) => {
    //if the user does not exist, create the user in the database
    if (result[0] === undefined) {
      return db.Users.create({
        user_name:req.body.name,
        user_login: req.body.login,
        user_email: req.body.email,
        user_desc: req.body.bio,
        user_avatar: req.body.avatar_url
      })
    }
    // if the user exists, send back the user login information
    if (result[0].dataValues.id) {
      return result[0].dataValues.user_login;
    }
  })
  .then((result) => {
    res.json(result);
  })
});

//Post route when instructor creates a course
router.post('/api/courses', function(req, res) {
  db.Courses.create({
    course_instructor: req.body.instructor,
    course_name:req.body.name,
    course_desc: req.body.description,
    course_time_start: req.body.startTime,
    course_time_end: req.body.endTime
  })
  .then((result) => {
    //finds course ID
    let courseId = result.dataValues.id;
    //finds user that created the course
    return db.Users.findOne({
      where: {
        user_login: req.body.instructor
      }
    })
    .then((result) => {
      //stores the user that created the course
      let userId = result.id;
      //links the user and the course into the enrollment table
      return db.Enrollment.create({
        CourseId: courseId,
        UserId: userId
      })
    })
    .then((result) => {
      //Creates sessions for the course
      for (let i = 0; i < req.body.sessions.length; i ++) {
        db.Sessions.create({
          session_date: req.body.sessions[i],
          CourseId: result.dataValues.CourseId
        })
      }
    })
    .then((result) => {
      res.json('Successfully created course');
    })
  });
});

//Post route when an instructor posts a session description and session name
router.post('/api/sessions/sessionInfo', function(req, res) {
    let values = { session_name: req.body.sessionTitle, session_desc: req.body.sessionDesc };
    let selector = { where: { id: req.body.sessionId }}
  return db.Sessions.update(values, selector)
  .then((result) => {
    console.log(result);
    res.json('Session updated');
  })
});

//Post route when student enrolls in a course
router.post('/api/enrollment', function(req, res) {
  return db.Users.findOne({
    where: {
      user_login: req.body.userName
    }
  })
  .then((result) => {
    let userId = result.dataValues.id;
    return db.Enrollment.create({
      CourseId: req.body.courseId,
      UserId: userId
    })
  })
  .then((result) => {
    console.log(result);
    res.json('Enrolled in course');
  })
});

//route to create new resource
router.post('/api/sessions/resources', function(req, res) {
  //find all sessions from the course
    return db.Sessions.findAll({
      where: {
        CourseId: req.body.courseId
      }
    })
    .then((result) => {
      //finds the user
      return db.Users.findOne({
        where: {
          user_login: req.body.userName
        }
      })
    })
    .then((result) => {
      let userId = result.dataValues.id;
      let instructorStatus = null;
      if (result.dataValues.instructor === true) {
        instructorStatus = result.dataValues.instructor
      }
      //creates resource tied to a specific session
      return db.Resources.create({
        CourseId: req.body.courseId,
        UserId: userId,
        user_login: req.body.userName,
        instructor: instructorStatus,
        resource_title: req.body.resourceTitle,
        SessionId: req.body.sessionId,
        resource_url: req.body.resourceUrl,
        resource_desc: req.body.resourceDesc
      });
    })
    .then((result) => {
      console.log(result);
      res.json('created resource');
    })
});

//Post route to star a resource
router.post('/api/sessions/starredResources', ((req, res) => {
  //finds user
  return db.Users.findOne({
    where: {
      user_login: req.body.userName
    }
  })
  .then((result) => {
    let userId = result.dataValues.id;
    //Creates a starred resource
    return db.Starred_Resources.create({
      CourseId: req.body.courseId,
      SessionId: req.body.sessionId,
      UserId: userId,
      ResourceId: req.body.resourceId,
    })
  })
  .then((result) => {
    res.json('Resource starred')
  })
}));

//Post route when a user uploads a comment
router.post('/api/sessions/comments', function(req, res) {
  //find all sessions from the course
    return db.Sessions.findAll({
      where: {
        CourseId: req.body.courseId
      }
    })
    .then((result) => {
      //finds the user
      return db.Users.findOne({
        where: {
          user_login: req.body.userName
        }
      })
    })
    .then((result) => {
      let userId = result.dataValues.id;
      let userAvatar = result.dataValues.user_avatar;
      //creates comment tied to a specific session
      return db.Comments.create({
        CourseId: req.body.courseId,
        SessionId: req.body.sessionId,
        UserId: userId,
        user_login: req.body.userName,
        user_avatar: userAvatar,
        comment_text: req.body.commentText
      })
    })
    .then((result) => {
      res.json('created comment');
    })
});

//Route when user submits a rating
router.post('/api/sessions/rating', function(req, res) {
  //finds user from username
  return db.Users.findOne({
      where: {
        user_login: req.body.userName
      }
  })
  .then((result) => {
  let userId= result.dataValues.id;
  //creates a rating associated with user
  return db.Ratings.create({
    SessionId: req.body.SessionId,
    rating: req.body.rating,
    UserId: userId
  })
  })
  .then((result) => {
    //finds all ratings for the session the user rated
  return db.Ratings.findAll({
    where: {
      SessionId: req.body.SessionId
    }
    })
  })
  .then((result) => {
  //finds the average of all the ratings
  let allSessionRatings = [];
  let ratingSum = 0;
    for (let i = 0; i < result.length; i ++) {
      allSessionRatings.push(result[i].dataValues.rating);
    }
    for (let j = 0; j < allSessionRatings.length; j++) {
      ratingSum += allSessionRatings[j];
    }
    return ratingSum/allSessionRatings.length;
  })
  .then((session_rating) => {
    //updates the average rating in the session table
    let values = { session_rating: session_rating };
    let selector = { where: { Id: req.body.SessionId }}
    return db.Sessions.update(values, selector)
  })
  .then((result) => {
    res.json("Rating submitted")
  })
});

module.exports = router;
