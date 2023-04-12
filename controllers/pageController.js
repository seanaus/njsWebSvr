"use strict";
const productService = require("../services/productService");
const authService = require("../services/authService");
const componentService = require("../services/componentService");
// const settingsService = require("../services/settingsService");
const config = require("../config");
const renderHome = async (req, res) => {
    res.render('pages/home', {
        settings: config.projectSettings,
        navBar: await componentService.get("navBar"),
        carousel: await componentService.get("carousel"),
        content: await componentService.get("pageContent","home"),
        auth: getAuth(req)
    });
}
const renderAbout = async(req, res) => {
    res.render('pages/about', {
        settings: config.projectSettings,
        navBar: await componentService.get("navBar"),
        auth: getAuth(req)
    }); 
}
const renderProduct = async(req, res) => {
    const id = req.params.id;
    res.render('pages/product', {
        settings: config.projectSettings,
        navBar: await componentService.get("navBar"),
        product: await productService.get(id),
        auth: getAuth(req)
    });
};
const renderProducts = async(req, res) => {
    res.render('pages/products', {
        settings: config.projectSettings,
        navBar: await componentService.get("navBar"),
        products: await productService.getAll(),
        auth: getAuth(req)
    });
};
const renderLocation = async(req, res) => {
    res.render('pages/location', {
        settings: config.projectSettings,
        navBar: await componentService.get("navBar"),
        auth: getAuth(req)
    }); 
}
const renderCart = async(req, res) => {
    res.render('pages/cart', {
        settings: config.projectSettings,
        navBar: await componentService.get("navBar"),
        auth: getAuth(req)
    }); 
}
const renderSignIn = async(req, res) => {
    res.render('pages/signIn', {
        settings: config.projectSettings,
        navBar: await componentService.get("navBar"),
        auth: getAuth(req)
    });
};
const renderRegister = async (req, res) => {
    res.render('pages/register', {
        settings: config.projectSettings,
        navBar: await componentService.get("navBar"),
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
    renderProducts,
    renderLocation,
    renderCart,
    renderSignIn,
    renderRegister
};