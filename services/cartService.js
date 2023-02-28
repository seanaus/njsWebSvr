"use strict";
const config = require("../config");
const firebase = require("../db");
const productService = require("./productService");
const requestService = require("./requestService")
const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const Delivery = require("../models/delivery");
const Payment = require("../models/payment");
const Totals = require("../models/totals");
const { reqStatus } = require('../enums/cart');

const firestore = firebase.firestore();

const main = async (req) => {

    const request = requestService.get(req, "CART");

    switch (request.status) {
        case reqStatus.getRequest:
            return await get(request.id);
        case reqStatus.newRequest:
            request.id = await create(request);
            return await get(request.id);
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
            request.customData,
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
                customData: cart.customData,
                items: cart.items.map((obj) => {
                    return Object.assign({}, obj);
                }),
                delivery: Object.assign({}, new Delivery(
                    cart.delivery.forename,
                    cart.delivery.surname,
                    cart.delivery.address1,
                    cart.delivery.address2,
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
                    cart.payment.completed
                )),
                totals: Object.assign({}, new Totals(
                    cart.totals.vatMetric,
                    cart.totals.exVat,
                    cart.totals.incVat,
                    cart.totals.count
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
const get = async (id) => {

    const doc = await firestore.collection('cart').doc(id).get()
    return new Cart(
        doc.data().id,
        doc.data().uId,
        doc.data().customData,
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

    let cart = await get(cartId);
    const product = await productService.get(productId);
    const idx = findIndex(cart.items, productId);
    
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

    let cart = await get(cartId);
    const idx = findIndex(cart.items, productId);

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
const findIndex = (items, id) => {
  return items.findIndex((item) => {
    return item.id === id
  });
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
const addCustomerInfo = async(id, data) => {

    let cart = await get(id);

    cart = deliveryInfo(cart, data.delivery);
    cart = paymentInfo(cart, data.payment);

    if (await save(cart)) {
        return cart
    } else {
        return {}
    }

}
const addDeliveryInfo = async(id, data) => {

    let cart = await get(id);
    cart = deliveryInfo(cart, data.delivery);

    if (await save(cart)) {
        return cart
    } else {
        return {}
    }

}
const deliveryInfo = (cart, data) => {

    cart.delivery.forename = data.forename;
    cart.delivery.surname = data.surname;
    cart.delivery.address1 = data.address1;
    cart.delivery.address2 = data.address2;
    cart.delivery.town = data.town;
    cart.delivery.city = data.city;
    cart.delivery.county = data.county;
    cart.delivery.postcode = data.postcode;
    cart.delivery.email = data.email;
    cart.delivery.telephone = data.telephone;
    cart.delivery.shippingOption = data.shippingOption;

    return cart
}

const addPaymentInfo = async(id, data) => {

    let cart = await get(id);
    cart = paymentInfo(cart, data.payment)

    if (await save(cart)) {
        return cart
    } else {
        return {}
    }

}
const paymentInfo = (cart, data) => {

    cart.payment.cardNo = data.cardNo;
    cart.payment.nameOnCard = data.nameOnCard;
    cart.payment.csv = data.csv;
    cart.payment.expiryDate = data.expiryDate;
    cart.payment.completed = data.completed;

    return cart

}
module.exports = {
    main,
    save,
    addItem,
    removeItem,
    addCustomerInfo,
    addDeliveryInfo,
    addPaymentInfo
}