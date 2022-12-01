"use strict";
const PORT = 8080;
const express = require("express");
const app = express();
const router = express.Router();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const auth = require("./core/auth");
const authState = (req, res, next) => {
  auth.login();
  next();
}

app.use(authState);
app.use(express.json());
app.use("/", authRoutes.routes);
app.use("/", userRoutes.routes);
app.use("/", productRoutes.routes);
app.use("/", cartRoutes.routes);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}.......`);
});
