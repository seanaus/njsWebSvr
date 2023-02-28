"use strict";
const express = require("express");
const app = express();
const path = require("path");
const favicon = require("serve-favicon");
const handlebars = require('express-handlebars');
const config = require("./config");
const routesRoute = require("./routes/routesRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const methodOverride = require("method-override");
const { connect, authToken } = require("./middleware/auth");
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
// app.set('views', 'views');

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
app.use(async (req, res, next) => {
  if (Object.keys(authUser).length === 0) {
    await connect(req, res);
    authUser = req.body.auth;
  }
  next();
});

app.use("/", routesRoute.routes);
app.use("/", authRoute.routes);
app.use("/", userRoute.routes); 
app.use("/api/product", productRoute.routes);
app.use("/api/cart", cartRoute.routes);

app.listen(config.port, () => {
  console.log(`App listening on ${config.port}.......`);
});
