"use strict";
const firebase = require("../db");
const { loadProduct } = require("../core/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart");
const Delivery = require("../models/delivery");
const Payment = require("../models/payment");
const { reqStatus, reqParaMap } = require('../enums/cart');
const { linkUserToCart } = require("../config");
const firestore = firebase.firestore();
const querystring = require('querystring')

const getCart = async (qryParams) => {

    let request = getRequest(qryParams);

    if (request.status === reqStatus.NEW_REQUEST) {
        request.id = await newCart(qryParams.uId, qryParams.appId);
        request.status = reqStatus.GET_REQUEST
    }

    return await loadCart(request.id);
}
// const reqParamIdField = async (req) => {
//     let field = "";
//     for (const [key] of Object.keys(req)) {
//         field = key;
//     }
//     return field
// }
const getRequest = (qryParams) => {
    console.log("getRequest");

    qryParams = querystring.parse(querystring.stringify(qryParams))
    const params = Object.entries(qryParams);

    let id = params[reqParaMap.id][reqParaMap.keyValue.value] 
    const uId = params[reqParaMap.uId][reqParaMap.keyValue.value]
    // const creatorId = params[reqParaMap.creatorId][reqParaMap.keyValue.value]

    let request = {
        id: id,
        uId: uId,
        status: reqStatus.badRequest
    }

    // request.status = reqStatus.badRequest

    if (id !== "") {
        request.status = reqStatus.getRequest
    }
    if (id === "" && uId !== "") {
        request.status = reqStatus.newRequest;
    }

    
    const key = params[reqParaMap.creatorId][reqParaMap.keyValue.key] 
    const value = params[reqParaMap.creatorId][reqParaMap.keyValue.value]
    request[key] = value;

    console.log(`Key: ${key}`);
    console.log(`Val: ${value}`);
    // console.log(params[reqParaMap.creatorId][reqParaMap.keyValue.key]);
    ///IFFFF
    console.log(`IS: ${JSON.stringify(request)}`);
    //request[params[reqParaMap.creatorId][reqParaMap.keyValue.key]] = params[reqParaMap.creatorId][reqParaMap.keyValue.value];
    

    // console.log("REQUEST02");
    // console.log(`ID: ${id}`);
    // console.log(`IS: ${JSON.stringify(request)}`);
    return {
        request
    };
}
const newCart = async (uId, appId) => {
    const parentId = linkUserToCart ? uId : appId;
    if (parentId !== undefined) {
        try {
            const id = await addDoc();
            const cart = new Cart(
                id,
                linkUserToCart ? uId : appId,
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
        if (linkUserToCart) {
            return new Cart(
                doc.data().id,
                doc.data().userId,
                doc.data().items,
                doc.data().delivery,
                doc.data().payment,
                doc.data().totalCost,
                doc.data().totalCount,
                doc.data().created
            )
        } else {
            return new Cart(
                doc.data().id,
                doc.data().appId,
                doc.data().items,
                doc.data().delivery,
                doc.data().payment,
                doc.data().totalCost,
                doc.data().totalCount,
                doc.data().created
            )
        }
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
    // console.log(linkUserToCart);
    // console.log(cart.uId);
    if (linkUserToCart) {
        Object.assign(data, { "userId": cart.userId })
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
const findItem = async (items, product) => {

    const idx = items.findIndex((item) => {
        return item.id === product.id
    });
    return idx
}

module.exports = {
    getCart,
    saveCart
}