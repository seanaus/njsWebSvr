"use strict";
const config = require("../config");
const firebase = require("../db");
const { loadProduct, findProduct } = require("../core/product");
const { getRequest } = require("./request")
const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const Delivery = require("../models/delivery");
const Payment = require("../models/payment");
const Totals = require("../models/totals");
const { reqStatus } = require('../enums/cart');

const firestore = firebase.firestore();

const main = async (req) => {

    const request = getRequest(req, "CART");

    switch (request.status) {
        case reqStatus.getRequest:
            return await load(request.id);
        case reqStatus.newRequest:
            request.id = await create(request);
            return await load(request.id);
        default:
            return reqStatus.badRequest;
    }
}
const create = async (request) => {
    try {
        request.id = await addDoc();
        const cart = new Cart(
            request.id,
            request.uId,
            request.metaData,
            undefined,
            undefined,
            undefined,
            undefined,
            new Date().toLocaleString('en-GB', { timeZone: 'UTC' })
        );
        if (await save(cart)) {
            return request.id
        } else {
            return {}
        }
    } catch (error) {
        console.log(error.message);
        return {}
    }
}
const save = async (cart) => {

    calcTotals(cart);

    const doc = await firestore.collection('cart').doc(cart.id);
    try {
        await doc.set(
            {
                id: cart.id,
                uId: cart.uId,
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
                totals: Object.assign({}, new Totals(
                    cart.totals.vatMetric,
                    cart.totals.exVat,
                    cart.totals.incVat

                )),
                created: cart.created
            },
            { merge: true }
        );
        return true
    } catch (error) {
        console.log(error.message);
        return false
    }
}
const load = async (id) => {

    const doc = await firestore.collection('cart').doc(id).get()
    return new Cart(
        doc.data().id,
        doc.data().uId,
        doc.data().metaData,
        doc.data().items,
        doc.data().delivery,
        doc.data().payment,
        doc.data().totals,
        doc.data().created
    )
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
const addItem = async (cartId, productId) => {

    let cart = await load(cartId);
    const product = await loadProduct(productId);
    const idx = await findProduct(cart.items, productId);

    if (idx === -1) {
        const item = new CartItem(product);
        cart.items = [...cart.items, item];
    } else {
        cart.items[idx] = editQuantity(cart.items, idx, "+");
    }
    if (await save(cart)) {
        return cart
    } else {
        return {}
    }
}
const removeItem = async (cartId, productId) => {

    let cart = await load(cartId);
    const idx = await findProduct(cart.items, productId);

    if (idx !== -1) {
        if (cart.items[idx].quantity > 1) {
            cart.items[idx] = editQuantity(cart.items, idx, "-");
        } else {
            deleteItem(cart.items, idx);
        }
    }
    if (await save(cart)) {
        return cart
    } else {
        return {}
    }
}
const editQuantity = (items, idx, option) => {
    if (option === "+") {
        items[idx].quantity = items[idx].quantity + 1;
        items[idx].cost = items[idx].cost + items[idx].unitCost;
        return items[idx]
    }
    if (option === "-") {
        items[idx].quantity = items[idx].quantity - 1;
        items[idx].cost = items[idx].cost - items[idx].unitCost;
        return items[idx]
    }
}
const deleteItem = (items, idx) => {
    items.splice(idx, 1);
}
const calcTotals = (cart) => {
    cart.totals.count = Number(calcItemTotal(cart.items, "quantity"));
    cart.totals.exVat = Number(calcItemTotal(cart.items, "cost"));
    cart.totals.vatMetric = Number(config.vatMetric());
    cart.totals.incVat = cart.totals.exVat + (cart.totals.exVat * cart.totals.vatMetric);
}
const calcItemTotal = (items, option) => {
    if (items.length > 0) {
        return items.map((item) => {
            return item[option]
        }).reduce((total, value) => {
            return total + value
        });
    } else {
        return 0
    }
}
module.exports = {
    cartMain: main,
    saveCart: save,
    addCartItem: addItem,
    delCartItem: removeItem
}