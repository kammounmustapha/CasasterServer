require("./config/config");
require("./models/db");
require("./config/passportConfig");

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const rtsIndex = require("./routes/index.router");
const companyIndex = require("./routes/company.router");

// middleware

var app = express();
app.use(cookieParser("abcdefg"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "abcdefg",
    resave: true,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use("/api", rtsIndex);
app.use(companyIndex);
app.use(express.json());
// error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach(key =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

// start server
app.listen(process.env.PORT, () =>
  console.log(`Server started at port : ${process.env.PORT}`)
);
