"use strict";
const { authUser } = require("../core/auth");

const getAuthenticated = (req, res, next) => {
    const auth =  authUser();
    res.json(auth);
    next();
};

module.exports = {
    getAuthenticated
};
