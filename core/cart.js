"use strict";
const firebase = require("../db");
const { loadProduct } = require("../core/product");
const { getRequest } = require("./request")
const Cart = require("../models/cart");
const CartItem = require("../models/cart");
const Delivery = require("../models/delivery");
const Payment = require("../models/payment");
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
            request.metaData,
            undefined,
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

    const doc = await firestore.collection('cart').doc(cart.id);
    try {
        await doc.set(
            {
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
        doc.data().metaData,
        doc.data().items,
        doc.data().delivery,
        doc.data().payment,
        doc.data().totalCost,
        doc.data().totalCount,
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
// const addItem = async (cartId, productId) => {

//     const product = loadProduct(productId);
//     let cart = getCart(cartId);
//     const idx = findProduct(cart.items, productId)
//     if (idx === undefined) {
//         const item = new CartItem(product);
//         cart.items = [...cart.items, item];
//     } else {
//         cart.items[idx] = editQuantity(cart.items[idx], "+")
//     }

// }
// const editQuantity = (item, option) => {
//     if (option === "+") {
//         item.quantity = item.quantity + 1
//         item.cost = item.cost + item.unitCost
//         return item
//     }
//     if (option === "-") {
//         if (item.quantity > 1) {
//             item.quantity = item.quantity + 1
//             item.cost = item.cost + item.unitCost
//         } else {
//         }
//         return item
//     }
// }
const removeItem = (item, option) => {
}
module.exports = {
    cartMain: main,
    saveCart: save
}