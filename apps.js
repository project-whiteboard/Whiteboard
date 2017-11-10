// Variables - Dependencies & Reqs
const cors = require('cors');
const db = require('./models');
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
let apiRoutes = require('./routes/apiRoutes');
let userRoutes = require('./routes/userRoutes');
let PORT = process.env.PORT || 3000;


// Express - Initialize
const app = express();

// Express - CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Express - Static routes
app.use("/public", express.static(__dirname + '/public'));

// Express - Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Express - Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars")
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));

// Express - Routes
app.use(apiRoutes);
app.use(userRoutes);

// Sequelize - Set database and keys
db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).
  then((result) => {
    db.sequelize.sync().then(function() {
      app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
      });
    })
});