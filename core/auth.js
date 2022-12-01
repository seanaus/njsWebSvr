"use strict";
const firebase = require("../db");
const bcrypt = require("bcrypt");
const Auth = require("../models/auth");
const { loadUser } = require("../core/user");
const auth = new Auth("", "", "", "", "");

const login = async () => {
  const email = "admin@googlemail.com";
  try {
    // Get authentication data
    const userCredential = await firebase.auth()
    .signInWithEmailAndPassword(
      email,
      await bcrypt.hash(email, "$2b$10$0bOy5I.kfP3qwOeMXqWUle")
    );
    // Get user record for authId that was returned by signIn (userCredential.user.uid)
    const user = await loadUser(userCredential.user.uid)

    auth.id = userCredential.user.uid,
    auth.displayName = userCredential.user.displayName !== null
      ? userCredential.user.displayName
      : `${user.forename} ${user.surname}`,
    auth.email = userCredential.user.email,
    auth.emailVerified = userCredential.user.emailVerified,
    auth.token = userCredential.user.getIdToken()
  }
  catch (err) {
    console.log(err);
  }
}
const authUser = () => {
  return auth
}

// const encrypt = async (password) => {
//   try {
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hash = await bcrypt.hash(password, salt);
//     return hash;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

module.exports = {
  login,
  authUser
}