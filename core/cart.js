"use strict";
const firebase = require("../db");
const Cart = require("../models/cart");
const CartItem = require("../models/cart");
const Delivery = require("../models/delivery");
const Payment = require("../models/payment");
const { requestStatus } = require('../enums/cart');
const { linkUserToCart } = require("../config");
const firestore = firebase.firestore();

const request = async(qryParams) => {

    let id = qryParams.id !== "" ? qryParams.id: undefined;
    const uId = (qryParams.uId !== "" && linkUserToCart) ? qryParams.uId : undefined
    const appId = qryParams.appId !== "" ? qryParams.appId : undefined

    let status = requestStatus.BAD_REQUEST
    console.log(`FFS01!!!!`);
    if(id !== undefined ) {
        status = requestStatus.GET_REQUEST
    }  else {
        console.log(`FFS02!!!!`);
        status = requestStatus.NEW_REQUEST; 
        id = await initCart(qryParams.uId, qryParams.appId);      
    }
    // if(id === undefined && appId !== undefined) {
    //     status = requestStatus.NEW_REQUEST; 
    //     id = await initCart(qryParams.uId, qryParams.appId);
    // }
    console.log(`FFS04!!!!`);

    return { 
        id: id,
        uId: uId , 
        appId: appId,
        status: status 
    }
}
const initCart = async (uId, appId) => {
    console.log(`initCart`);
    if (appId !== undefined) {
        try {
            const id = await addDoc();
            console.log(`initCart02`);
            const cart = new Cart(
                id,
                uId,
                appId,
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
                return undefined
            }
        } catch (error) {
            console.log(error.message);
            return undefined
        }
    } else {
        return undefined
    }
}
const saveCart = async (cart) => {
    const doc = await firestore.collection('cart').doc(cart.id);
    try {
        console.log(`saveCart01`);
        await doc.set(cartMeta(cart), { merge: true });
        return true
    } catch (error) {
        console.log(error.message);
        return false
    }
}
const loadCart = async (qryParams) => {
    const params = request(qryParams);
    try {
        const doc = await firestore.collection('cart').doc(params.id).get()
        const data = new Cart(
            doc.data().id,
            doc.data().userId,
            doc.data().appId,
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
    let data = {
        id: cart.id,
        appId: cart.appId,
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
    if(linkUserToCart) {
        Object.assign(data, {"userId": cart.uId})
    }
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
module.exports = {
    loadCart,
    saveCart
}