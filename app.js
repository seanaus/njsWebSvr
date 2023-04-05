"use strict";
const express = require("express");
const app = express();
const path = require("path");
const favicon = require("serve-favicon");
const config = require("./config");
const pageRoute = require("./routes/pageRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const methodOverride = require("method-override");
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const navBar = require('./views/viewHelpers/components/navBar');
const carousel = require('./views/viewHelpers/components/carousel');
const productCard = require('./views/viewHelpers/components/productCard');
const lightBox = require('./views/viewHelpers/components/lightBox');
const middleware = require("./middleware/middleware");

let adminUser = {};
// let projectSettings = {};

///////////// HANDLEBARS SETUP ///////////////
const hbs = handlebars.create({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'index',
  partialsDir: __dirname + '/views/partials/',
  helpers: {
    setVisibility: navBar.setVisibility,
    currentSlide: carousel.curentSlide,
    styleSlide: carousel.styleSlide,
    ukCurrency: productCard.ukCurrency
    // createImageId: lightBox.createImageId,
    // createEventCall: lightBox.createEventCall
  },
  events: {
    clickMe: () => {
      console.log("button was clicked");
    }
  }
})

/////////////// MIDDLEWARE /////////////////
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

app.use(async (req, res, next) => {
  if (Object.keys(adminUser).length === 0) {
    adminUser = await middleware.connect(req);
    // console.log(`AUTH: ${JSON.stringify(adminUser)}`)
  }
  next();
});

// Apply Handlebars View Engine Configuration
if (config.useViewEngine) {
  app.set('view engine', 'hbs');
  app.engine('hbs', hbs.engine);
  app.use((req, res, next) => {
    middleware.setHeaders(req, res, next)
  });
}

// Route Configuration
app.use("/api/auth", authRoute.routes);
app.use("/api/user", userRoute.routes);
app.use("/api/product", productRoute.routes);
app.use("/api/cart", cartRoute.routes);
if (config.useViewEngine) {
  app.use("/", pageRoute.routes);
}

app.listen(config.port, () => {
  console.log(`App listening on ${config.port}.......`);
});
