"use strict";
const encrypt = require("./encrypt");
const Auth = require("../models/auth")
const User = require("../models/user");
const config = require("../config");
const firebase = require("../db");
const user = require("./user");
const jwt = require("./jwt");
const cache = require("./cache");
const { token } = require("../enums/jwt");
const { cacheId } = require("../enums/cache");

const createFirebaseUser = async (email, password) => {
  let cred = {};
  try {
    cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (err) {
    console.log(err);
  }
  return cred
}
const signInFirebaseUser = async (email, password) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.log(err);
    return {}
  }
}
const register = async (req) => {

  const salt = req.body.salt === undefined ? await encrypt.genSalt(10) : req.body.salt

  let newUser = new User(
    "-1",
    req.body.forename,
    req.body.surname,
    `${req.body.forename} ${req.body.surname}`,
    req.body.email,
    false,
    salt,
    "standard"
  );

  let response = new Auth("", "");

  const hash = await encrypt.hash(req.body.password, salt);
  const usr = await user.get(undefined, newUser.email);

  if (usr === undefined) {
    const cred = await createFirebaseUser(newUser.email, hash);
    if (cred !== null && cred !== undefined && Object.keys(cred).length !== 0) {
      newUser.id = cred.user.uid;
      response.accessToken = jwt.get(newUser.id, token.access);
      response.refreshToken = jwt.get(newUser.id, token.refresh);
      const success = await user.save(newUser);
      if (success) {
        if (!await cache.add(cacheId.auth,response.refreshToken)) {
          response.accessToken = "";
          response.refreshToken = "";
        }
      }
    }
  }
  return response
}
const signIn = async (req) => {

  let response = new Auth("", "");

  const usr = await user.get(undefined, req.body.email);
  const password = await getPassword(usr, req.body.password);

  if (usr) {
    if (await signInFirebaseUser(usr.email, password)) {
      if (usr.email !== config.adminMail) {
        response.accessToken = jwt.get(usr.id, token.access);
        response.refreshToken = jwt.get(usr.id, token.refresh);
      }
    }
  }
  return response
}
const signOut = async (token = undefined) => {

  if (token !== undefined) {
    console.log(`Auth-Core-SignOut: ${token}`);
    return await cache.remove(cacheId.auth, token);
  } else {
    return true
  }

}
const getPassword = async (user, password) => {
  return user.email !== config.adminMail
    ? await encrypt.hash(password, user.salt)
    : config.adminHash;
}

module.exports = {
  register,
  signIn,
  signOut
}