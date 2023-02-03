"use strict";
const config = require("../config");
const firebase = require("../db");
const Component = require("../models/component");
const firestore = firebase.firestore();
const load = async (id) => {
    try {
        const doc = await firestore.collection('components').doc(id).get()
        if (doc === undefined) {
            console.log("No component data found");
            return {}
        } else {
            const component = new Component(id)
            doc.data().items.forEach((item) => {
                component.add(item);
            })
            return component;
        }
    } catch (error) {
        console.log(error.message);
        return {}
    }
}
module.exports = {
    loadComponent : load
}