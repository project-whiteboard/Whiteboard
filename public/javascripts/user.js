$(function() {
const currentURL = window.location.origin;
let clientId = '7650c457e77cfe731cb1';
let clientSecret = 'd110bc6c2898235d0c86d7a996c9cd273bb19f97';
let redirectUri = 'https://localhost:3000/new';
let usersLocalStorage = JSON.parse(localStorage.getItem('User'));
console.log(usersLocalStorage);


// onClick - profile sidebar toggle
$('#slide').on('click', function () {
  $('#userInfo').toggleClass('active');
});

// onClick - Initial log in button before authentication
$('#login').on('click', function(event) {
    event.preventDefault();
    gitHubRedirect();
});

// onClick - Login button that appears after authentication
$('#authenticatedUser').on('click', function(event) {
  event.preventDefault();
  userAuthentication();
});

// Redirect - user to GitHub for authentication
function gitHubRedirect () {
  window.location.replace('https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&state=1234');
};
// After redirect, posts the auth code, stores the returned access token, then gets the user data and posts it to our DB
function userAuthentication() {
//parses the authentication code from the URL
function getAuthCode(url){
  var error = url.match(/[&\?]error=([^&]+)/);
  if (error) {
      throw 'Error getting authorization code: ' + error[1];
  }
  return url.match(/[&\?]code=([\w\/\-]+)/)[1];
}
//defines the authentication code
let authCode = getAuthCode(window.location.href);
//posts to github to receive accesstoken
$.post('https://github.com/login/oauth/access_token?&client_id=' + clientId + '&client_secret=' + clientSecret + '&code=' + authCode, function(data) {
  localStorage.setItem("accessToken", data);
  //get request from github to get user data
  $.get('https://api.github.com/user?' + data, function(res, err) {
    let user = res;
    //store user data locally
    localStorage.setItem('User', JSON.stringify(res));
    //stores user in database
    $.post('/api/users', user, function(data) {
      //if the response is a string (an existing user) redirect to that username profile page
      if (typeof(data) === 'string'){
        return window.location.href = currentURL + '/user/' + data;
      }
      //if new user then go to the new user's login page
        window.location.href = currentURL + '/user/' + data.user_login;
    });
  });
});
};

// onClick - When user submits a new course
$('#submitNewCourse').on('click', function(e) {
  const weekInMiliseconds = 604800000;
  const dayInMiliseconds = 86400000;
  //All dates in unix (ms)
  let startDate = moment($('#inputStartDate').val() + " " + $('#inputCourseTime').val()).valueOf();

  let endDate = moment($('#inputEndDate').val() + " " + $('#inputCourseTime').val()).valueOf();
  let courseLength = endDate - startDate;
  let numberOfWeeks = courseLength/weekInMiliseconds;
  console.log('Number of weeks: ' + numberOfWeeks);

  let sessionFrequency = $('#inputCourseFreq').val();

  let sessionDates = [];
  //MWF Class option class starts on monday

  if ($('#inputCourseFreq').val() === '3') {
    //Class every 2 days m/w/f
    for (let i =0; i < numberOfWeeks; i++) {
      let sessionInterval = dayInMiliseconds * 2;
      for (let j = 0; j < sessionFrequency; j ++) {
        sessionDates.push(startDate);

        if (sessionDates.length > 0 && sessionDates.length % 3 == 0) {
          sessionInterval = dayInMiliseconds * 3;
          startDate += sessionInterval;
        }
        else {
          startDate += sessionInterval;
        }
      }
    }
  }

  //Class every weekday
  if ($('#inputCourseFreq').val() === '5') {
      for (let i =0; i < numberOfWeeks; i++) {
        let sessionInterval = dayInMiliseconds;
      for (let j = 0; j < sessionFrequency; j ++) {
        sessionDates.push(startDate);

        if (sessionDates.length > 0 && sessionDates.length % 5 == 0) {
          sessionInterval = dayInMiliseconds * 3;
          startDate += sessionInterval;
        }
        else {
          startDate += sessionInterval;
        }
      }
    }
  }

  //Formats session dates before sending to server
  for (let i = 0; i < sessionDates.length; i++) {
    sessionDates[i] = (sessionDates[i]/1000);
    sessionDates[i] = moment.unix(sessionDates[i]).format('MM/DD/YY h:mmA')
  }
    e.preventDefault();
    let newCourse = {
      instructor: usersLocalStorage.login,
      name: $('#inputCourseName').val(),
      description: $('#inputCourseDescription').val(),
      time: $('#inputCourseTime').val(),
      sessions: sessionDates
    };

    //posts new course to server
    $.ajax("/api/courses", {
      type: "POST",
      data: newCourse
    }).then(
      //after response, sends user to profile page to see all courses
      function(data) {
        window.location.href = currentURL + '/user/' + usersLocalStorage.login;
      }
    );
});

 //When user clicks on one of their courses, redirects them to the sessions for that course
  $('.selectedCourse').on('click', ((e) => {
      e.preventDefault();
      let courseId = $(e.target)[0].id;
      console.log($(this).attr('id'));
      console.log(courseId);
      console.log(currentURL);
      window.location.href = currentURL + "/user/" + usersLocalStorage.login + '/courses/' + courseId + '/sessions'
  }));

  //Posts a resource
  $('.resourceSubmit').on('click', function(e) {
    e.preventDefault();
    let sessionId = $(this).attr('id');
    let newResource = {
      courseId: $('.courseId').attr('data-id'),
      userName: usersLocalStorage.login,
      resourceTitle: $('#resourceTitle' + sessionId).val(),
      resourceUrl: $('#resourceUrl' + sessionId).val(),
      resourceDesc: $('#resourceDesc' + sessionId).val(),
      sessionId
    };
    console.log(newResource);
    $.post('/api/sessions/resources', newResource, ((data) => {
      console.log(data);
      window.location.reload();
    }));

  });
//On click when a user submits a rating
  $('.ratingSubmit').on('click', function(e) {
    e.preventDefault();
    let rating = $("input[name='ratings']:checked").val();
    console.log(rating);
      let newRating = {
        SessionId: $(this).attr('id'),
        rating,
        userName: usersLocalStorage.login,
      }

      $.post('/api/sessions/rating', newRating, ((data) => {
        console.log(data);
        window.location.reload();
      }));
  });

//When a user stars a resource, posts it
  $('.starResource').on('click', function(e) {
    e.preventDefault();
    let resourceId = $(this).attr('id');
    // need to find sessionId somehow
    let sessionId = $(this).data("sessionId");
    let newStarredResource = {
      sessionId,
      courseId: $('.courseId').attr('data-id'),
      userName: usersLocalStorage.login,
      resourceId,
    }
    console.log(newStarredResource)
    $.post('/api/sessions/starredResources', newStarredResource, ((data) => {
      console.log(data);
      window.location.reload();
    }));
  });

//when a user comments, posts it
  $('.commentSubmit').on('click', function(e) {
    e.preventDefault();
    let sessionId = $(this).data("sessionId");
    let courseId = $('.courseId').attr('data-id');
    let newComment = {
      sessionId,
      courseId,
      userName: usersLocalStorage.login,
      commentText: $('#commentText' + sessionId).val()
    }

  $.post('/api/sessions/comments', newComment, ((data) => {
    console.log(data);
    window.location.reload();
  }))
  });

//when instructor submits session description
    $('.sessionDescSubmit').on('click', function(e) {
    e.preventDefault();
    let sessionId = $(this).attr("id");
    let courseId = $('.courseId').attr('data-id');
    let sessionInfo = {
      sessionId,
      courseId,
      userName: usersLocalStorage.login,
      sessionTitle: $('#sessionTitle' + sessionId).val(),
      sessionDesc: $('#sessionDesc' + sessionId).val()
    }
      $.post('/api/sessions/sessionInfo', sessionInfo, ((data) => {
        console.log(data);
        window.location.reload();
  }))
  });

//When student enrolls in course
    $('.enrollCourse').on('click', function(e) {
      e.preventDefault();
      let courseId = $(this).attr('id');
      let userName = usersLocalStorage.login;

      let newStudent = {
        courseId,
        userName
      }
      $.post('/api/enrollment', newStudent, ((data) => {
        console.log(data);
        window.location.reload();
      }))
    })

});
