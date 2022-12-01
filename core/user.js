"use strict";
const firebase = require("../db");
const User = require("../models/user");
const firestore = firebase.firestore();

const loadUser = async (id) => { 
    const users = await loadUsers();
    return users.find(usr => {
        return usr.id === id;
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
                    doc.data().salt
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
        return await firestore.collection("users").doc().set(user);
    } catch (error) {
        console.log(error.message);
        return "-1"
    }
}

module.exports = {
    loadUser,
    loadUsers,
    saveUser
}