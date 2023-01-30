"use strict";
const renderHome = (req, res) => {
    res.render('home', {
        title: "Potteries Jaguar Spares"
    });
}
const renderRegister = (req, res) => {
    res.render('register');
};
const renderSignIn = (req, res) => {
    res.render('signIn');
};
module.exports = {
    renderHome,
    renderRegister,
    renderSignIn
};