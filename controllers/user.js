"use strict";
const { genSalt } = require("bcrypt");
// const { loadUser, loadUsers, saveUser } = require("../core/user");
const { createNew, signIn } = require("../core/user");

// const register = async (req, res, next) => {
//     res.json(await createNew(req));
//     next();
// }
// const logIn = async (req, res, next) => {
//     res.json(await signIn(req));
//     next();
// }
const getUser = async (req, res, next) => {
    const user = await loadUser(req.params.id);
    res.json(user);
    next();
};
const getUsers = async (req, res, next) => {
    const users = await loadUsers();
    res.json(users);
    next();
};

const register = async (req, res, next) => {
    try {
        // const password = await encrypt(req.body.password);
        const salt = await genSalt(10);
        // req.body = {req.body,...{"salt": salt}}
        const data = {
            body : {
                forename : req.body.forename,
                surname : req.body.surname,
                email : req.body.email, 
                password : req.body.password, 
                salt : salt
            }
        }
        const user = await createNew(data);
        // console.log(`CONTROLLER-REGISTER: ${JSON.stringify(user)}`);

      } catch (error) {
        console.log(error);
      }
      next();
}

module.exports = {
    getUsers,
    getUser,
    register
};