"use strict";
const firebase = require("../db");
const Cart = require("../models/cart");
const CartItem = require("../models/cart");
const firestore = firebase.firestore();

const initCart = async (userId) => {
    const dateTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
    const cart = new Cart(userId, dateTime);
    cart.id = await saveCart(cart);
    return await loadCart(cart.id);
    // console.log(`CARTID : ${id}`)
    // return id;
}
const saveCart = async (cart) => {
    // Generate "locally" a new document in a collection
    const addDoc = await firestore.collection('cart').doc();
    const id = addDoc.id;
    // console.log(`saveCart: ${cart.id}`);
    try {
        // const cart = req.body.cart;
        const fsCart = {
            id : id,
            userId: cart.userId,
            totalCount: cart.totalCount,
            totalCost: cart.totalCost,
            created: cart.created
        };
        await addDoc.set(fsCart);
        return id
    } catch (error) {
        console.log(error.message);
        return {id: '-1'}
    }
}
const updateCart = (id = -1) => {

}

const loadCart = async (id) => {
    console.log(`loadCart: ${id}`);
    try {
        const doc = await firestore.collection('cart').doc(id).get()
        const cart = new Cart(
            id,
            doc.data().userId,
            doc.data().items,
            doc.data().totalCost,
            doc.data().totalCount
        )
        return cart
    } catch (error) {
        console.log(error.message);
        return {}
    }
}

module.exports = {
    initCart,
    loadCart,
    saveCart,
    updateCart
}