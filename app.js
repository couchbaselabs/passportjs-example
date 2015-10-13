var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var couchbase = require("couchbase");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var config = require("./config");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Use JADE for rendering pages
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(session({ secret: "nraboy_is_cool" }));
app.use(passport.initialize());
app.use(passport.session());

// PassportJS auth information to be serialized into a session
passport.serializeUser(function(user, done) {
    done(null, user.uid);
});

// PassportJS auth information to be deserialized from the session
passport.deserializeUser(function(userId, done) {
    done(null, userId);
});

// Global declaration of the Couchbase server and bucket to be used
module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);

app.use(express.static(path.join(__dirname, "public")));

// All endpoints to be used in this application
var routes = require("./routes/routes.js")(app);

// Logic behind authorization
var authstrategies = require("./auth/strategies.js");

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
