"use strict";
const productService = require("../services/productService");
const componentService = require("../services/componentService");

const renderHome = async(req, res) => {
    res.render('pages/home', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar")
    }); 
}
const renderAbout = async(req, res) => {
    res.render('pages/about', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar")
    }); 
}
const renderProduct = async(req, res) => {
    res.render('pages/product', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar"),
        products: await productService.getAll()
    });
};
const renderLocation = async(req, res) => {
    res.render('pages/location', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar")
    }); 
}
const renderCart = async(req, res) => {
    res.render('pages/cart', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar")
    }); 
}
const renderSignIn = async(req, res) => {
    res.render('pages/signIn', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar")
    });
};
const renderRegister = async (req, res) => {
    res.render('pages/register', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar")
    });
};
module.exports = {
    renderHome,
    renderAbout,
    renderProduct,
    renderLocation,
    renderCart,
    renderSignIn,
    renderRegister
};