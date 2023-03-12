"use strict";
const express = require("express");
const app = express();
const path = require("path");
const favicon = require("serve-favicon");
const handlebars = require('express-handlebars');
const config = require("./config");
const pageRoute = require("./routes/pageRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const methodOverride = require("method-override");
const cookieParser = require('cookie-parser');
const middleWare = require("./middleware/auth");
let adminUser = {};

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public/favicon/", "favicon.ico")));
app.use(methodOverride("_method"));
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

// View Engine Configuration (Handlebars)
if(config.useViewEngine) {
  app.set('view engine', 'hbs');
  app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials/'
  }));
}
// Custom Middleware
app.use(async (req, res, next) => {
  if (Object.keys(adminUser).length === 0) {
    adminUser = await middleWare.connect(req);
  }
  next();
});

app.use((req, res, next) => {
  if(config.useViewEngine) {
    middleWare.setHeaders(req)
  }
  next();
});

// Route Configuration
if(config.useViewEngine) app.use("/", pageRoute.routes);
app.use("/api/auth", authRoute.routes);
app.use("/api/user", userRoute.routes); 
app.use("/api/product", productRoute.routes);
app.use("/api/cart", cartRoute.routes);

app.listen(config.port, () => {
  console.log(`App listening on ${config.port}.......`);
});
