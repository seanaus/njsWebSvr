"use strict";
const express = require("express");
const app = express();
const config = require("./config");
// const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const methodOverride = require("method-override");
const { connect } = require("./middleware/auth");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');

// Custom Middleware
app.use(connect);
// app.use("/", authRoutes.routes);
app.use("/", userRoutes.routes);
app.use("/", productRoutes.routes);
app.use("/", cartRoutes.routes);

app.listen(config.port, () => {
  console.log(`App listening on ${config.port}.......`);

});
