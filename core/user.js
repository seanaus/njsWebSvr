"use strict";
const firebase = require("../db");
const { genSalt, hash } = require("./encrypt");
const { createUserWithEmailAndPassword, signInUserWithEmailAndPassword } = require("./auth");
const User = require("../models/user");
const config = require("../config");
const firestore = firebase.firestore();
const { token } = require("../enums/jwt");
const jwt = require("./jwt")

const createNew = async (req) => {

    const salt = req.body.salt === undefined ? await genSalt(10) : req.body.salt

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

    const hashPass = await hash(req.body.password, salt);
    const usr = await loadUser(undefined, user.email);

    if (usr === undefined) {
        const cred = await createUserWithEmailAndPassword(user.email, hashPass);
        if (cred !== null && cred !== undefined && Object.keys(cred).length !== 0) {
            user.id = cred.user.uid;
            // const accessToken = jwtHelper.get(user.id, token.access);
            const refreshToken = jwt.get(user.id, token.refresh);
            await jwt.save(refreshToken);
            const response = await saveUser(user)
            if (response === false) {
                user.id = -1;
            }
        }
    }
    return user
}
const signIn = async (req) => {

    const user = await loadUser(undefined, req.body.email);
    const password = await getPassword(user, req.body.password);

    if (user) {
        if (await signInUserWithEmailAndPassword(user.email, password)) {
            return user
        } else {
            return new User("-1", "", "", "", req.body.email, false, "", "standard")
        }
    } else {
        return new User("-1", "", "", "", req.body.email, false, "", "standard")
    }
}
const loadUser = async (id = undefined, email = undefined) => {
    const users = await loadUsers();
    return users.find(usr => {
        return id === undefined ? usr.email === email : usr.id === id;
    });
}
const loadUsers = async () => {
    let userArray = [];
    try {
        // Get User Collection
        const users = await firestore.collection("users");
        const data = await users.get();

        if (data.empty) {
            console.log("No user records found");
        } else {
            data.forEach((doc) => {
                const user = new User(
                    doc.id,
                    doc.data().forename,
                    doc.data().surname,
                    doc.data().displayName,
                    doc.data().email,
                    doc.data().verified,
                    doc.data().salt,
                    doc.data().role
                );
                userArray = [...userArray, user]
            });
        }
    } catch (error) {
        console.log(error.message);
    }
    return userArray;
}
const saveUser = async (user) => {
    try {
        const doc = await firestore.collection("users").doc(user.id);
        await doc.set({
            id: user.id,
            forename: user.forename,
            surname: user.surname,
            displayName: user.displayName,
            email: user.email,
            verified: user.verified,
            salt: user.salt,
            role: user.role
        });
        return true
    } catch (error) {
        console.log(error.message);
        return false
    }
}
const getPassword = async (user, password) => {
    return user.email !== config.adminMail
        ? await hash(password, user.salt)
        : config.adminHash;
}
module.exports = {
    loadUser,
    loadUsers,
    saveUser,
    createUser: createNew,
    signInUser: signIn
}