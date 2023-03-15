"use strict";
const productService = require("../services/productService");
const authService = require("../services/authService");
const componentService = require("../services/componentService");

const renderHome = async (req, res) => {
    res.render('pages/home', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar"),
        auth: getAuth(req)
    });
}
const renderAbout = async(req, res) => {
    res.render('pages/about', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar"),
        auth: getAuth(req)
    }); 
}
const renderProduct = async(req, res) => {
    res.render('pages/product', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar"),
        products: await productService.getAll(),
        auth: getAuth(req)
    });
};
const renderLocation = async(req, res) => {
    res.render('pages/location', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar"),
        auth: getAuth(req)
    }); 
}
const renderCart = async(req, res) => {
    res.render('pages/cart', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar"),
        auth: getAuth(req)
    }); 
}
const renderSignIn = async(req, res) => {
    res.render('pages/signIn', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar"),
        auth: getAuth(req)
    });
};
const renderRegister = async (req, res) => {
    res.render('pages/register', {
        title: "Potteries Jaguar Spares",
        navbar: await componentService.get("navbar"),
        auth: getAuth(req)
    });
};
const getAuth = (req) => {
    return authService.getHeaders(req).accessToken === undefined ? false : true
}
module.exports = {
    renderHome,
    renderAbout,
    renderProduct,
    renderLocation,
    renderCart,
    renderSignIn,
    renderRegister
};