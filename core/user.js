"use strict";
const firebase = require("../db");
const User = require("../models/user");
const firestore = firebase.firestore();

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
                    doc.data().email,
                    doc.data().password,
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
        // console.log(user);
        return await firestore.collection("users").doc(user.id).set(userMeta(user));
    } catch (error) {
        console.log(error.message);
        return "-1"
    }
}
const userMeta = (user) => {
    return {
        id: user.id,
        forename: user.forename,
        surname: user.surname,
        email: user.email,
        password: user.password,
        salt: user.salt,
        role: user.role
    };
}
module.exports = {
    loadUser,
    loadUsers,
    saveUser
}