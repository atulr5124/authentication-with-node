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
app.use(bodyParser.urlencoded({extended:true}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =========================
// Routes
// =========================

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", function(req, res) {
    res.render("secret");
});

// Auth Routes

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({username: username}), password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/secret");
        });
    });
});

app.listen(3000, function() {
    console.log("Server started!");
});