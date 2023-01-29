"use strict";
// const renderRoot = ((req, res, next) => {
//     res.redirect('/home');
//     next();
// });
const renderHome = ((req, res, next) => {
    res.render('home');
    next();
});
const renderRegister = ((req, res, next) => {
    res.render('register');
    next();
});
const renderSignIn = ((req, res, next) => {
    res.render('signIn');
    next();
});
module.exports = {
    renderHome,
    renderRegister,
    renderSignIn,
};