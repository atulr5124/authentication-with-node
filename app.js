var express = require("express"),
        mongoose = require("mongoose"),
        passport = require("passport"),
        bodyParser = require("body-parser"),
        localStrategy = require("passport-local"),
        passportLocalMongoose = require("passport-local-mongoose"),
        User = require("./models/user");

mongoose.connect("mongodb://localhost/auth_with_node");
var  app = express();

app.use(require("express-session")({
    secret: "Wingardium Leviosa",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", function(req, res) {
    res.render("secret");
});

app.listen(3000, function() {
    console.log("Server started!");
});