"use strict";
const bcryptService = require("./bcryptService");
const Auth = require("../models/auth")
const User = require("../models/user");
const config = require("../config");
const firebase = require("../db");
const userService = require("./userService");
const jwtService = require("./jwtService");
const cacheService = require("./cacheService");
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

  // const salt = req.body.salt === undefined ? await bcryptService.genSalt(10) : req.body.salt
  const salt = await bcryptService.genSalt(10)

  let user = new User(
    "-1",
    req.body.forename,
    req.body.surname,
    `${req.body.forename} ${req.body.surname}`,
    req.body.email,
    false,
    salt,
    "standard"
  );

  let auth = new Auth("", "");

  const hash = await bcryptService.hash(req.body.password, salt);
  const found = await userService.get(undefined, user.email);

  if (found === undefined) {
    const cred = await createFirebaseUser(user.email, hash);
    if (cred !== null && cred !== undefined && Object.keys(cred).length !== 0) {
      user.id = cred.user.uid;
      auth.accessToken = jwtService.get(user.id, token.access);
      auth.refreshToken = jwtService.get(user.id, token.refresh);
      const success = await userService.save(user);
      if (success) {
        if (!await cacheService.add(cacheId.auth, auth.refreshToken)) {
          auth.accessToken = "";
          auth.refreshToken = "";
        }
      }
    }
  }
  return auth
}
const signIn = async (req) => {

  let auth = new Auth("", "");
  const user = await userService.get(undefined, req.body.email);
  const password = await encrypted(user, req.body.password);

  if (user) {
    if (await signInFirebaseUser(user.email, password)) {
      if (user.email !== config.adminMail) {
        auth.accessToken = jwtService.get(user.id, token.access);
        auth.refreshToken = jwtService.get(user.id, token.refresh);
      }
    }
  }
  return auth
}
const signOut = async (token = undefined) => {

  if (token !== undefined) {
    return await cacheService.remove(cacheId.auth, token);
  } else {
    return true
  }

}
const encrypted = async (user, password) => {
  return user.email !== config.adminMail
    ? await bcryptService.hash(password, user.salt)
    : config.adminHash;
}

const authGuard = async (req, res, next) => {

  const auth = getHeaders(req);
  let data = jwtService.verify(auth.accessToken);
  // console.log(`AUTHGUARD: ${data}`)
  if (data === undefined) {
    data = await regenToken(auth.refreshToken);
    // console.log(`AUTHGUARD_02: ${data}`)
    if (data !== undefined) {
      setCookies(res, auth, config.authLifeSpan());
    }
  }
  console.log(`BELOW COOKIE: ${data}`)
  if (data !== undefined) {
    next();
  } else {
    res.sendStatus(403);
  }
}
const regenToken = async (value) => {
  let data = undefined;
  console.log(`regenToken: ${value}`);
  const cache = await cacheService.get(cacheId.auth);
  console.log(`regenTokenMatch: ${JSON.stringify(cache)}`);
  if (cache.items.includes(value)) {
    console.log(`regenTokenMatched: ${JSON.stringify(cache)}`);
    data = jwtService.verify(value, token.refresh);
    // console.log(`regenToken: ${data}`)
    if (data !== undefined) {
      data = jwtService.get(data, token.access);
    }
  } else {
    console.log("DONT EXIST!")
  }
  return data
}
const setCookies = (res, auth, lifeSpan = 5000, redirectTo) => {
  try {
    setCookie(res, "authX", auth.accessToken, lifeSpan);
    setCookie(res, "authXR", auth.refreshToken, lifeSpan, redirectTo);
    return true
  } catch (err) {
    console.log(err);
    return false
  }
}
const setCookie = (res, name, value, lifeSpan = 5000, redirectTo) => {
  try {
    res.cookie(name, value, {
      maxAge: lifeSpan,
      secure: true,
      httpOnly: true,
      sameSite: 'lax'
    })
    if (redirectTo !== undefined) {
      res.redirect(redirectTo);
    }
    return true
  } catch (err) {
    return false
  }

}
const getHeaders = (req) => {
  const authX = req.headers['authX'];
  const authXR = req.headers['authXR'];
  console.log(`AUTHX: ${JSON.stringify(authX)}`)
  console.log(`AUTHXR: ${JSON.stringify(authXR)}`)
  return new Auth(authX, authXR);
}
module.exports = {
  register,
  signIn,
  signOut,
  regenToken,
  setCookies,
  setCookie,
  authGuard
}