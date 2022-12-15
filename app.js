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
const methodOverride = require("method-override");

const connect = (req, res, next) => {
  auth.adminSignIn();
  next();
}
// const checkLog = (req, res, next) => {
//   auth.signInWithEmailAndPassword("webaddress01@googlemail.com", "Aus25031549");
//   next();
// }

app.use(connect);
// app.use(checkLog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", authRoutes.routes);
app.use("/", userRoutes.routes);
app.use("/", productRoutes.routes);
app.use("/", cartRoutes.routes);
app.use(methodOverride("_method"));


app.listen(PORT, () => {
  console.log(`App listening on ${PORT}.......`);
});
