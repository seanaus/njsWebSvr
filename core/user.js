"use strict";
const firebase = require("../db");
const encrypt = require("./encrypt");
const auth = require("./auth");
const Auth = require("../models/auth")
const User = require("../models/user");
const config = require("../config");
const firestore = firebase.firestore();
const { token } = require("../enums/jwt");
const jwt = require("./jwt")

const register = async (req) => {

    const salt = req.body.salt === undefined ? await encrypt.genSalt(10) : req.body.salt

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

    let response = new Auth("","");

    const hash = await encrypt.hash(req.body.password, salt);
    const usr = await get(undefined, user.email);

    if (usr === undefined) {
        const cred = await auth.createUserWithEmailAndPassword(user.email, hash);
        if (cred !== null && cred !== undefined && Object.keys(cred).length !== 0) {
            user.id = cred.user.uid;
            response.accessToken = jwt.get(user.id, token.access);
            response.refreshToken = jwt.get(user.id, token.refresh);
            const success = await save(user);
            if(success) {
                if(!await jwt.save(response.refreshToken)) {
                    response.accessToken = "";
                    response.refreshToken = "";
                }
            }
        }
    }
    return response
}
const signIn = async (req) => {

    let response = new Auth("","");

    const usr = await get(undefined, req.body.email);
    const password = await getPassword(usr, req.body.password);

    if(usr) {
        if(await auth.signInUserWithEmailAndPassword(usr.email, password)) {
            response.accessToken = jwt.get(usr.id, token.access);
            response.refreshToken = jwt.get(usr.id, token.refresh);
        }
    }
    return response
}
const get = async (id = undefined, email = undefined) => {
    const users = await getAll();
    return users.find(usr => {
        return id === undefined ? usr.email === email : usr.id === id;
    });
}
const getAll = async () => {
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
const save = async (user) => {
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
        ? await encrypt.hash(password, user.salt)
        : config.adminHash;
}
module.exports = {
    get,
    getAll,
    save,
    register,
    signIn
}