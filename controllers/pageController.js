"use strict";
const productService = require("../services/productService");
const authService = require("../services/authService");
const componentService = require("../services/componentService");
const settingsService = require("../services/settingsService");

const renderHome = async (req, res) => {
    const projectSettings = await settingsService.get();
    res.render('pages/home', {
        title: projectSettings.name,
        navbar: await componentService.get("navbar"),
        carousel: await componentService.get("carousel"),
        auth: getAuth(req)
    });
}
const renderAbout = async(req, res) => {
    const projectSettings = await settingsService.get();
    res.render('pages/about', {
        title: projectSettings.name,
        navbar: await componentService.get("navbar"),
        auth: getAuth(req)
    }); 
}
const renderProduct = async(req, res) => {
    const id = req.params.id;
    const projectSettings = await settingsService.get();
    res.render('pages/product', {
        title: projectSettings.name,
        navbar: await componentService.get("navbar"),
        product: await productService.get(id),
        auth: getAuth(req)
    });
};
const renderProducts = async(req, res) => {
    const projectSettings = await settingsService.get();
    res.render('pages/products', {
        title: projectSettings.name,
        navbar: await componentService.get("navbar"),
        products: await productService.getAll(),
        auth: getAuth(req)
    });
};
const renderLocation = async(req, res) => {
    const projectSettings = await settingsService.get();
    res.render('pages/location', {
        title: projectSettings.name,
        navbar: await componentService.get("navbar"),
        auth: getAuth(req)
    }); 
}
const renderCart = async(req, res) => {
    const projectSettings = await settingsService.get();
    res.render('pages/cart', {
        title: projectSettings.name,
        navbar: await componentService.get("navbar"),
        auth: getAuth(req)
    }); 
}
const renderSignIn = async(req, res) => {
    const projectSettings = await settingsService.get();
    res.render('pages/signIn', {
        title: projectSettings.name,
        navbar: await componentService.get("navbar"),
        auth: getAuth(req)
    });
};
const renderRegister = async (req, res) => {
    const projectSettings = await settingsService.get();
    res.render('pages/register', {
        title: projectSettings.name,
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
    renderProducts,
    renderLocation,
    renderCart,
    renderSignIn,
    renderRegister
};