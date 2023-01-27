"use strict";
const express = require("express");
const app = express();
const path = require("path");
const favicon = require("serve-favicon");
const handlebars = require('express-handlebars');
const config = require("./config");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const methodOverride = require("method-override");
const { connect } = require("./middleware/auth");
let authUser = {};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public/favicon/", "favicon.ico")));
app.use(methodOverride("_method"));

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'index',
  partialsDir: __dirname + '/views/partials/'
}));

app.use(
  "/matIcon/",
  express.static(
    path.join(__dirname, "node_modules/material-design-icons/iconfont")
  )
);
app.use(
  "/matIconFix/",
  express.static(
    path.join(__dirname, "node_modules/@fontsource/material-icons")
  )
);

// Custom Middleware
app.use(connect, (req, res, next) => {
  authUser = req.body.auth;
  next();
});

app.get('/', (req, res) => {
  res.render('home');
});


app.use("/", userRoutes.routes);
app.use("/", productRoutes.routes);
app.use("/", cartRoutes.routes);

app.listen(config.port, () => {
  console.log(`App listening on ${config.port}.......`);
});
