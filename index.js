var express = require("express");
var bodyParser = require("body-parser");

var upload = require("express-fileupload");
var adminroute = require("./routes/admin");
var userroute = require("./routes/user");

var session = require("express-session");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload());
app.use(express.static("public/"));



app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "a2z"
}));



app.use("/", userroute);

app.use("/admin", adminroute);

app.listen(1000);

