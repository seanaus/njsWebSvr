"use strict";
const firebase = require("../db");
const User = require("../models/user");
const config = require("../config");
const firestore = firebase.firestore();

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
module.exports = {
    get,
    getAll,
    save
}