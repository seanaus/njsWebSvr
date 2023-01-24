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
    const userExists = await loadUser(undefined, user.email);
    console.log(`USEREx: ${userExists}`);
    if(userExists === undefined) {
        const cred = await createUserWithEmailAndPassword(user.email, hashPass)
        if(cred !== null && cred !== undefined && Object.keys(cred).length !== 0) {
            user.id = cred.user.uid;
            // console.log(`USER02: ${JSON.stringify(user)}`);
            const response = await saveUser(user); 
            if(response)
                console.log("response");
                console.log(response);
        }

        // if(!await response) 
        //     user.id = undefined
    }
    return user
}
const signIn = async(req)=> {
    const user = await loadUser(undefined, req.email);
    if(user) {
        if(await signInUserWithEmailAndPassword(req.email, req.hashPass)) {
            return user
        } else {
            return new User(undefined,undefined,undefined,undefined,req.email,undefined,undefined,undefined)
        }
    } else {
        return new User(undefined,undefined,undefined,undefined,req.email,undefined,undefined,undefined)
    }
}
// const userExists = async(id, email)=> {
//     if(await loadUser(id, email) === undefined) {
//         return true
//     } else {
//         return false
//     }
// }
const loadUser = async (id = undefined, email = undefined) => { 
    // const users = await loadUsers();
    // return users.findIndex(usr => {
    //     return id === undefined ? usr.email === email : usr.id === id;
    // });
    let idx = -1;
    const users = await loadUsers();

    if(id !== undefined && email === undefined) {
        idx = users.findIndex(usr => {
            return usr.id == id
        })
    }
    if(id === undefined && email !== undefined) {
        idx = users.findIndex(usr => {
            return usr.email == email
        })
    }
    if(idx > -1) {
        return users[idx]
    } else {
        return undefined
    }
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
        if(await firestore.collection("users").doc(user.id).set(userMeta(user))) {
            return true
        } else {
            return false
        }
        // return await firestore.collection("users").doc(user.id).set(userMeta(user));
    } catch (error) {
        console.log(error.message);
        return false
    }
}
const userMeta = (user) => {
    return {
        id: user.id,
        forename: user.forename,
        surname: user.surname,
        email: user.email,
        verified: user.verified,
        salt: user.salt,
        role: user.role
    };
}
module.exports = {
    loadUser,
    loadUsers,
    saveUser,
    createNew,
    signIn
}