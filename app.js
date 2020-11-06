const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const expressHbs = require("express-handlebars");
const connectDb = require("./config/db");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");

//passport config
require("./config/passport")(passport);

//env config
dotenv.config({ path: "./config/.env" });

//connect DB
connectDb();

const app = express();

//body parser
app.use(express.urlencoded({ extended: false }));

//express handlebars
app.engine(".hbs", expressHbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

//public folder
app.use(express.static(path.join(__dirname, "public")));

//session
app.use(
  session({
    secret: "gf4fd54g5df4g",
    saveUninitialized: false,
    resave: false,
  })
);

//passport init
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//global vars
app.use((req, res, next) => {
  // res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.user = req.user;
  res.locals.error = req.flash("error");
  next();
});

app.use("/", require("./routes/userRoute"));
app.use("/", require("./routes/dashboardRoute"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
