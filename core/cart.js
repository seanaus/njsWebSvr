"use strict";
const firebase = require("../db");
const Cart = require("../models/cart");
const CartItem = require("../models/cart");
const Delivery = require("../models/delivery");
const Payment = require("../models/payment");
const firestore = firebase.firestore();

const initCart = async (userId) => {
    try {
        // const created = new Date().toLocaleString('en-GB', { timeZone: 'UTC' })
        const id = await addDoc();
        const cart = new Cart(
            id,
            userId,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            new Date().toLocaleString('en-GB', { timeZone: 'UTC' })
        );
        if (await saveCart(cart)) {
            return id 
        } else {
            return '-1'
        }
    } catch (error) {
        console.log(error.message);
        return '-1'
    }
}
const saveCart = async (cart) => {
    const doc = await firestore.collection('cart').doc(cart.id);
    try {
        await doc.set(cartMeta(cart), { merge: true });
        return true
    } catch (error) {
        console.log(error.message);
        return false
    }
}
const loadCart = async (id) => {
    try {
        const doc = await firestore.collection('cart').doc(id).get()
        const data = new Cart(
            doc.data().id,
            doc.data().userId,
            doc.data().items,
            doc.data().delivery,
            doc.data().payment,
            doc.data().totalCost,
            doc.data().totalCount,
            doc.data().created
        )
        return data
    } catch (error) {
        console.log(error.message);
        return {}
    }
}
const cartMeta = (cart) => {
    return {
        id: cart.id,
        userId: cart.userId,
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
module.exports = {
    initCart,
    loadCart,
    saveCart
}