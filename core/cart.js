"use strict";
const firebase = require("../db");
const { loadProduct } = require("../core/product");
const { getRequest } = require("../core/requestHandler")
const Cart = require("../models/cart");
const CartItem = require("../models/cart");
const Delivery = require("../models/delivery");
const Payment = require("../models/payment");
const { reqStatus } = require('../enums/cart');

const firestore = firebase.firestore();

const main = async (req) => {
    console.log("main");
    let request = getRequest(req, "CART");
    console.log("WTF");
    console.log(`STATUS: ${request.status}`);
    switch (request.status) {
        case reqStatus.getRequest:
            console.log("getRequest");
            return await loadCart(request.id);
        case reqStatus.newRequest:
            console.log("newRequest");
            request.id = await newCart(request);
            return await loadCart(request.id);
        default:
            console.log("badRequest");
            return reqStatus.badRequest;
    }
}

const newCart = async (request) => {
    try {
        console.log(`${JSON.stringify(request)}`)
        request.id = await addDoc();
        const cart = new Cart(
            request.id,
            request.metaData(),
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            new Date().toLocaleString('en-GB', { timeZone: 'UTC' })
        );
        if (await saveCart(cart)) {
            return request.id
        } else {
            return {}
        }
    } catch (error) {
        console.log(error.message);
        return {}
    }
}
const saveCart = async (cart) => {
    const doc = await firestore.collection('cart').doc(cart.id);
    try {
        console.log(`${JSON.stringify(cart)}`)
        await doc.set(cartMeta(cart), { merge: true });
        return true
    } catch (error) {
        console.log(error.message);
        return false
    }
}
const loadCart = async (id) => {

    const doc = await firestore.collection('cart').doc(id).get()
    return new Cart(
        doc.data().id,
        doc.data().metaData,
        doc.data().items,
        doc.data().delivery,
        doc.data().payment,
        doc.data().totalCost,
        doc.data().totalCount,
        doc.data().created
    )
}
const cartMeta = (cart) => {
    let data = {
        id: cart.id,
        metaData: cart.metaData,
        items: cart.items.map((obj) => {
            return Object.assign({}, obj);
        }),
        delivery: Object.assign({}, new Delivery(
            cart.delivery.forename,
            cart.delivery.surname,
            cart.delivery.address01,
            cart.delivery.address02,
            cart.delivery.town,
            cart.delivery.city,
            cart.delivery.county,
            cart.delivery.postcode,
            cart.delivery.email,
            cart.delivery.telephone
        )),
        payment: Object.assign({}, new Payment(
            cart.payment.cardNo,
            cart.payment.nameOnCard,
            cart.payment.csv,
            cart.payment.expiryDate,
            cart.delivery.completed
        )),
        totalCount: cart.totalCount === undefined ? 0 : cart.totalCount,
        totalCost: cart.totalCost === undefined ? 0 : cart.totalCost,
        created: cart.created
    };

    return data
}
const addDoc = async () => {
    try {
        const doc = await firestore.collection('cart').doc();
        await doc.set({});
        return doc.id
    } catch (error) {
        console.log(error.message);
        return '-1'
    }
}
const findItem = async (items, product) => {

    const idx = items.findIndex((item) => {
        return item.id === product.id
    });
    return idx
}

module.exports = {
    cartMain: main,
    saveCart
}