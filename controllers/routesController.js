"use strict";
const { loadComponent } = require("../core/component");

const renderHome = async(req, res) => {
    res.render('pages/home', {
        navbar: await loadComponent("navbar")
    });
}
const renderRegister = async (req, res) => {
    res.render('pages/register', {
        title: "Potteries Jaguar Spares"
    });
};
const renderSignIn = (req, res) => {
    res.render('pages/signIn', {
        title: "Potteries Jaguar Spares"
    });
};
module.exports = {
    renderHome,
    renderRegister,
    renderSignIn
};