"use strict";
const firebase = require("../db");
const { loadProduct } = require("../core/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart");
const Delivery = require("../models/delivery");
const Payment = require("../models/payment");
const { requestStatus } = require('../enums/cart');
const { linkUserToCart } = require("../config");
const firestore = firebase.firestore();
const querystring = require('querystring')

const getCart = async (qryParams) => {

    let request = getRequest(qryParams);

    if (request.status === requestStatus.NEW_REQUEST) {
        request.id = await newCart(qryParams.uId, qryParams.appId);
        request.status = requestStatus.GET_REQUEST
    }

    return await loadCart(request.id);
}
const getRequest = (qryParams) => {
    // qryParams = querystring.stringify(qryParams)
    let request = querystring.parse(querystring.stringify(qryParams))
    console.log("getRequest");
    for (const [key, value] of Object.entries(request)) {
        console.log(`${key}: ${value}`);
    }
    // console.log(`PARAMETER01 ${request.id}`);
    // console.log(`PARAMETER02 ${request.uId}`);
    // console.log(`PARAMETER03 ${request.appId}`);
    // let params = querystring.stringify(qryParams)
    // let param = querystring.parse(qryParams).split("&");
    // let param = querystring.stringify(qryParams).split("&");;
    // Object.assign(request, ...`{ ${param[0]} }`)
    // Object.assign(request, ...`{ ${param[1]} }`)
    // Object.assign(request, ...`{ ${param[2]} }`)
    // qryParams = qryParams.toString().substring(1, qryParams.length - 2);
    // console.log(request);
    // params.forEach((param) => {
    //     Object.assign(request, param)
    //     // return { ...request, ...param }
    // },)


    // this.cart.items = [...this.cart.items, { ...item, cost: item.unitCost, quantity: 1 }];
    // console.log(JSON.stringify(param[0]));
    // console.log(JSON.stringify(param[1]));
    // console.log(JSON.stringify(param[2]));
    let id = qryParams.id !== "" ? qryParams.id : undefined;
    // const uId = (qryParams.uId !== "" && linkUserToCart) ? qryParams.uId : undefined
    const uId = (qryParams.uId !== "") ? qryParams.uId : undefined
    const appId = qryParams.appId !== "" ? qryParams.appId : undefined

    let status = requestStatus.BAD_REQUEST
    if (id !== undefined) {
        status = requestStatus.GET_REQUEST
    }
    if (id === undefined && uId !== undefined) {
        status = requestStatus.NEW_REQUEST;
    }
    return {
        id: id,
        uId: uId,
        appId: appId,
        status: status
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