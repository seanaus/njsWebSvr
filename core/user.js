"use strict";
const firebase = require("../db");
const { createUserWithEmailAndPassword, signInUserWithEmailAndPassword } = require("../core/auth");
const User = require("../models/user");
const firestore = firebase.firestore();

const createNew = async(req)=> {
    let user = new User(
        "-1", 
        req.body.forename,
        req.body.surname,
        `${ req.body.forename} ${req.body.surname}`,
        req.body.email, 
        false, 
        req.body.salt, 
        "standard"
    );

    const hashPass = req.body.password;
    const usr = await loadUser(undefined, user.email);

    if(usr === undefined) {
        const cred = await createUserWithEmailAndPassword(user.email, hashPass);
        if(cred !== null && cred !== undefined && Object.keys(cred).length !== 0) {
            user.id = cred.user.uid;
            const response = await saveUser(user)
            if(response === false){
                user.id = -1;
            } 
        }
    } 
    return user
}
const signIn = async(req)=> {
    const user = await loadUser(undefined, req.body.email);
    if(user) {
        if(await signInUserWithEmailAndPassword(req.body.email, req.body.password)) {
            return user
        } else {
            return new User("-1","","","",req.body.email,false,"","standard")
        }
    } else {
        return new User("-1","","","",req.body.email,false,"","standard")
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
const saveUser = async(user) => {
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
    loadUser,
    loadUsers,
    saveUser,
    createNew,
    signIn
}