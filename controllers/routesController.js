"use strict";
const productService = require("../services/productService");
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
const renderProduct = async(req, res) => {
    const cookie = req.cookies['auth']
    if(cookie !== undefined) {
        res.setHeader("Authorization",`Bearer ${cookie}`)
    }
    res.render('pages/product', {
        title: "Potteries Jaguar Spares",
        products: await productService.getAll()
        // products: [{"name":"Name01"},{"name":"Name02"}]
    });
};
module.exports = {
    renderHome,
    renderRegister,
    renderSignIn,
    renderProduct
};