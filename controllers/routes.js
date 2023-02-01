"use strict";
const renderHome = (req, res) => {
    res.render('home', {
        title: "Potteries Jaguar Spares"
    });
}
const renderRegister = async (req, res) => {
    res.render('register', {
        title: "Potteries Jaguar Spares"
    });
};
const renderSignIn = (req, res) => {
    res.render('signIn', {
        title: "Potteries Jaguar Spares"
    });
};
module.exports = {
    renderHome,
    renderRegister,
    renderSignIn
};