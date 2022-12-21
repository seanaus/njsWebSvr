"use strict";
const firebase = require("../db");
const { genSalt, hash, compare } = require("../core/encrypt");
const { loadUser, saveUser } = require("../core/user");
const Auth = require("../models/auth");
const User = require("../models/user");
let auth = new Auth();

const adminSignIn = async () => {
  if (auth.uId === "") {
    const adminUser = new User("", "Admin", "User", "admin01@googlemail.com", "admin01@googlemail.com", "")
    auth = await signInUser({ ...adminUser, option: "firebase" })
  }
  console.log(`adminSignIn - ${JSON.stringify(auth)}`)
}
const displayName = (value, fullname) => {
  if (value !== undefined && value !== null) {
    return value
  } else {
    return fullname
  }
}
const createUser = async (data) => {
  let cred = {};
  const exists = await loadUser(undefined, data.email);
  if (!exists) {
    const user = new User("", data.forename, data.surname, data.email, "", "");
    user.salt = await genSalt();
    user.password = await hash(data.password, user.salt);
    cred = await createUserWithEmailAndPassword(user.email, user.password);
    user.id = cred.user.uid
    user.password = user.password.replace(user.salt, "");
    const response = await saveUser(user);
    return new Auth(user.id, `${user.forename} ${user.surname}`, user.email, false, "");
  }
};
const createUserWithEmailAndPassword = async (email, password) => {
  try {
    return await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (err) {
    console.log(err);
    return { uid: "-1", displayName: null }
  }
}
const signInUserWithEmailAndPassword = async (email, password) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.log(err);
    return { uid: "-1", displayName: null }
  }
}
const signInUser = async (data) => {
  let cred = {};
  try {
    const user = await loadUser(undefined, data.email);
    if (user) {
      const hash = user.salt + user.password;
      const match = await compare(data.password, hash);
      if (match) {
        if (data.option === "firebase") {
          cred = await signInUserWithEmailAndPassword(data.email, hash);
        }
        return new Auth(user.id, displayName(cred.user.displayName, `${user.forename} ${user.surname}`), user.email, false, "");
      }
    } else {
      return new Auth("-1", "", data.email, "false", "")
    }
  }
  catch (err) {
    console.log(err);
    return new Auth("-1", "", data.email, "false", "")
  }

}

const authUser = () => {
  return auth
}
module.exports = {
  adminSignIn,
  authUser,
  createUser,
  signInUser
}