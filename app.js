require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./server/models/User");

const app = express();

app.set('view engine', 'ejs');


/**
 * Controllers (route handlers).
 */

const carsController = require("./server/controllers/cars")
const userController = require("./server/controllers/user")
const homeController = require("./server/controllers/home")
const americaController = require("./server/controllers/america")
const japanController = require("./server/controllers/japan")
const europeController = require("./server/controllers/europe")
const carsApiController = require("./server/controllers/api/searched-cars");
 



const { PORT, MONGODB_URI } = process.env;

/**
 * connect to database
 */




mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/***
 * We are applying our middlewear
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))


app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

app.get("/", homeController.list);

app.get("/allcars", carsController.list);
app.get("/allcars/delete/:id", carsController.delete);
app.get("/allcars/update/:id", carsController.edit);
app.post("/allcars/update/:id", carsController.update);

app.get("/america", americaController.list);
app.get("/america/delete/:id", americaController.delete);
app.get("/america/update/:id", americaController.edit);
app.post("/america/update/:id", americaController.update);

app.get("/japan", japanController.list);
app.get("/japan/delete/:id", japanController.delete);
app.get("/japan/update/:id", japanController.edit);
app.post("/japan/update/:id", japanController.update);

app.get("/europe", europeController.list);
app.get("/europe/delete/:id", europeController.delete);
app.get("/europe/update/:id", europeController.edit);
app.post("/europe/update/:id", europeController.update);

app.get("/search-cars",(req,res) => {
  res.render('search-cars', carsApiController);
});
app.get("/api/searched-cars", carsApiController.list);





app.get("/login", (req, res) => {
  res.render('login', { errors: {} })
});
app.post("/login", userController.login);

app.get("/register", (req, res) => {
  res.render('register', { errors: {} })
});
app.post("/register", userController.create);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.get("/create-cars", authMiddleware, (req, res) => {
  res.render("create-cars", { errors: {} });
});
app.post("/create-cars", carsController.create);



app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
    chalk.green("✓")
  );
});