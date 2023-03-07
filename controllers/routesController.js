"use strict";
const componentService = require("../services/componentService");

const renderHome = async(req, res) => {
    res.render('pages/home', {
        navbar: await componentService.loadComponent("navbar")
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
const renderProduct = (req, res) => {
    res.render('pages/product', {
        title: "Potteries Jaguar Spares"
    });
};
module.exports = {
    renderHome,
    renderRegister,
    renderSignIn,
    renderProduct
};