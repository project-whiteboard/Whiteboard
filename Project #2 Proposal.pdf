# Project2
### BootcampSpot Dynamic Syllabus
“A better spot for bootcamp”

|      | Table of Contents |
| ---- | ----------------- |
| I.   | [Proposal](#proposal) |
| II.  | [Tools](#tools) |
| III. | [File Tree](#filetree) |
| IV.  | [Contributions](#contributionpolicy) |
| V.   |  |

<br>
<hr>

## Proposal <a name='proposal'></a>

### Issue
Mandated learning resources, lesson prep materials, and the course syllabus (and their attendant learning objectives) are contradictory in places, under curated in others, and wholly fragmented if not altogether absent.

BootcampSpot is a hollow and two-dimensional tool as it exists, but one which we believe offers a platform and framework to solve the above issues. By extending BootcampSpot’s ‘Week Sessions’ calendar our team can greatly enhance the learning experience for the course’s students, and the teaching experience for it’s instructors and TAs.


### Fix
Consolidate student and instructor interaction more centrally to BootcampSpot by extending the functionality of the ‘Sessions’ syllabus. To achieve this we will give the instructor/TAs greater backend or ‘admin’ options toward customizing the syllabus and session specific ‘card’ to enable students to not only log their attendance, but interact with the card dynamically. This can be from posting lesson prep-work and/or resources, to having the students be able to rate that resource and/or post their own resources as they pertain to that lesson. Other things, from a “Raise Hand” button that would alert a TA in real-time as to the student's question, while still enabling instruction to progress, to the hosting of the recorded lesson stream, to the monitoring of student engagement in the lesson via a “page focus” script,  are actively being explored as well.

<br>
<hr>

## Tools <a name='tools'></a>

- <img height="15px" src="https://raw.githubusercontent.com/konpa/devicon/master/icons/nodejs/nodejs-original.svg?sanitize=true"> Node.js
  - <img height="15px" src="https://raw.githubusercontent.com/konpa/devicon/master/icons/npm/npm-original-wordmark.svg?sanitize=true"> Body-Parser - translate various formats
  - <img height="25px" src="https://raw.githubusercontent.com/konpa/devicon/master/icons/express/express-original-wordmark.svg?sanitize=true"> Express.js
    - <img height="25px" src="https://raw.githubusercontent.com/konpa/devicon/master/icons/handlebars/handlebars-original-wordmark.svg?sanitize=true"> Handlebars - templating engine for student profiles and instructor/admin dashboards
    - <img height="25px" src="https://raw.githubusercontent.com/konpa/devicon/master/icons/sequelize/sequelize-original-wordmark.svg?sanitize=true"> Sequelize -  manipulating MySQL tables
  - <img height="15px" src="http://www.jordanhawker.com/assets/momentjs-7f0552e21c342fd1a62f26cad3e81532.png"> Moment.js -  user session tracking
  - <img height="15px" src="https://raw.githubusercontent.com/konpa/devicon/master/icons/mysql/mysql-original-wordmark.svg?sanitize=true"> MySQL - linking to database
- <img height="15px" src="https://azure.microsoft.com/svghandler/sql-database/"> MySQL Database - to capture users, resources, interaction
- <img height="15px" src="https://raw.githubusercontent.com/konpa/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg?sanitize=true"> Bootstrap 4 - HTML/CSS frameworks
- <img height="15px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Oauth_logo.svg/180px-Oauth_logo.svg.png"> OAuth (GitHub) - login and administering of privileges
- <img height="15px" src="https://raw.githubusercontent.com/konpa/devicon/master/icons/electron/electron-original-wordmark.svg?sanitize=true"> Electron - multi-platform usability (desktop or in-browser)
- <img height="15px" src="https://raw.githubusercontent.com/konpa/devicon/master/icons/github/github-original-wordmark.svg?sanitize=true"> GitHub - repository for versioning and project cards
- <img height="15px" src="https://www.draw.io/images/google-drive-logo.svg"> Google Drive - doc coordination and hosting
- <img height="15px" src="https://raw.githubusercontent.com/konpa/devicon/master/icons/slack/slack-original.svg?sanitize=true"> Slack Channel (private) - team communication
- <img height="15px" src="https://www.draw.io/images/apple-touch-icon.png"> Draw io - mockups and wireframes for site, user flow, and database organization
- <img height="15px" src="https://d2cy1obokpvee9.cloudfront.net/manifest/favicon-196x196.png"> Chatkit - on-site and/or in-app chat

<br>
<hr>

## File Tree <a name='filetree'></a>

- __Project2__
  - [app.js](Project2/app.js)
  - [node_modules](Project2/node_modules)
  - [package.json](Project2/package.json)
  - [package-lock.json](Project2/package-lock.json)
  - [README.md](Project2/README.md)
  - __public__
    - __images__
    - __javascripts__
      - [scripts.js](Project2/public/javascripts/scripts.js)
    - __stylesheets__
      - [style.css](Project2/public/stylesheets/style.css)
  - __routes__
    - [index.js](Project2/routes/index.js)
    - [users.js](Project2/routes/users.js)
  - __views__
    - [index.handlebars](Project2/views/index.handlebars)
      - __layouts__
        - [main.handlebars](Project2/views/layout.handlebars)
      - __partials__
        - [course.handlebars](Project2/views/course.handlebars)
        - [login.handlebars](Project2/views/login.handlebars)
        - [profile.handlebars](Project2/views/profhandlebars.handlebars)
        - [session.handlebars](Project2/views/session.handlebars)
        - [session_card.handlebars](Project2/views/session_card.handlebars)

<br>
<hr>

## Contribution Policy <a name='contributionpolicy'></a>

### GitHub Flow
GitHub Flow is a simple and effective branching strategy which the folks at GitHub use. Most teams actually do not need everything GitFlow gives them and are much better off with a simpler workflow.

GitHub Flow is in a nutshell:

1. Update master to latest [upstream](../reference/git-setup.md#upstream) code
1. Create a feature branch `git checkout -b myFeatureBranch`
1. Do the feature/work
1. Push feature branch to [origin](../reference/git-setup.md#origin)
1. Create pull request from origin/<featureBranch> -> upstream/master
1. Review, fix raised comments, merge your PR or even better, get someone else to.

The main rule of GitHub Flow is that master should *always* be deployable. GitHub Flow allows and encourages [continuous delivery](../reference/continuous-delivery.md).

#### Resources
 - [GitHubFlow guide by GitHub](https://guides.github.com/introduction/flow/index.html)
 - [GitHub Flow original blog post](http://scottchacon.com/2011/08/31/github-flow.html)
 - [Phil Haack's (haacked) GitHubFlow aliases](http://haacked.com/archive/2014/07/28/github-flow-aliases/)
 - [GitHubFlow vs GitFlow](http://lucamezzalira.com/2014/03/10/git-flow-vs-github-flow/)