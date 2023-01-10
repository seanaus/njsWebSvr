"use strict";
const firebase = require("../db");
const { loadProduct } = require("../core/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart");
const Delivery = require("../models/delivery");
const Payment = require("../models/payment");
const Request = require("../models/request");
// const { reqStatus, reqParaMap } = require('../enums/cart');
const { linkUserToCart } = require("../config");
const firestore = firebase.firestore();
// let request = new Request({});

// const querystring = require('querystring')
// let request = {
//     id: "",
//     uId: "",
//     status: 0
// }
const getCart = async (req) => {

    // request = getRequest(qryParams);
    handleRequest(req);

    // const values = Object.values(request);

    // if (request.status === reqStatus.newRequest) {
    //     request.id = await newCart(request);
    //     request.status = reqStatus.getRequest
    // }

    // return await loadCart(request.id);
}
const handleRequest = async (req) => {

    let request = new Request(req.query);
    let id = request.id();
    let uId = request.uId();
    let userIdOveride = request.userIdOveride();
    // console.log(`${JSON.stringify(userIdOveride)}`);
    console.log(`${id}`);
    console.log(`${uId}`);
    console.log(`${userIdOveride.key}`);
    console.log(`${userIdOveride.value}`);
    // console.log(`${JSON.stringify(userIdOveride)}`);
    // console.log(`${JSON.stringify(request.userIdOveride())}`);
    // console.log(`${JSON.stringify(request)}`);
    // const params = Object.entries(req.query);

    
    // request.id = req.query.id
    // request.uId = req.query.uId

    // const lastParam = Object.entries(req.query)[Object.entries(req.query).length - 1]
    // const linkField = Object.fromEntries([lastParam]);

    // request.addItem(linkField);
    // console.log(`${JSON.stringify(linkField)}`);

    // request = new Request(id, uId, linkField);
    // console.log(`${JSON.stringify(request)}`);
    // console.log(`${JSON.stringify(getEntry(request,0))}`);
}
const getEntry = (obj, idx) => {
    if(idx <= entries(obj)) {
        return Object.entries(obj)[idx];
    }
}
const entries = (obj) => {
    return Object.keys(obj).length;
}
// ROLLBACK
// const getRequest = (qryParams) => {

//     // CREATE OBJECT FROM qryParams, THEN CREATE ARRAY
//     // OF KEY/VALUE PAIRS
//     qryParams = querystring.parse(querystring.stringify(qryParams));
//     const params = Object.entries(qryParams);

//     // REQUEST OBJECT TO BE RETURNED
//     request.id = params[reqParaMap.id][reqParaMap.keyValue.value];
//     request.uId = params[reqParaMap.uId][reqParaMap.keyValue.value];
//     request.status = reqStatus.badRequest;

//     const cartFKField = ((params.length - 1) === reqParaMap.cartFKField)
//         ? params[reqParaMap.cartFKField][reqParaMap.keyValue.key]
//         : "userId";
//     const cartFKValue = ((params.length - 1) === reqParaMap.cartFKField)
//         ? params[reqParaMap.cartFKField][reqParaMap.keyValue.value]
//         : params[reqParaMap.uId][reqParaMap.keyValue.value];

//     // APPEND FOREIGN KEY FIELD AND VALUE TO REQUEST OBJECT
//     // IF THIRD ROUTE PARAMETER SUPPLIED THIS WILL BE USED (FIELD AND VALUE)
//     // OTHERWISE 'userId' and 'uId' VALUES ARE USED
//     request[cartFKField] = cartFKValue;

//     if (request.id !== "") {
//         request.status = reqStatus.getRequest
//     }
//     if (request.id === "" && request.uId !== "") {
//         request.status = reqStatus.newRequest;
//     }
//     // console.log(`${JSON.stringify(request)}`);
//     return request

// }
const newCart = async (request) => {
    // console.log(`LINK_ID ${linkId}`)
    // const parentId = linkUserToCart ? uId : appId;
    // if (linkId !== "") {
    try {
        request.id = await addDoc();
        // console.log(`NEW_ID ${id}`)
        const cart = new Cart(
            request.id,
            request.linkId,
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
            return {}
        }
    } catch (error) {
        console.log(error.message);
        return {}
    }
    // } else {
    //     return {}
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

    const entry = {}
    Object.assign(data, { label: cart.linkId })

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