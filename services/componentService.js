"use strict";
const firebase = require("../db");
const Component = require("../models/component");
const firestore = firebase.firestore();

const get = async (id) => {
    try {
        const docRef = firestore.collection('components').doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return new Component(id)
        } else {
            const component = new Component(id);
            const docData = doc.data() ?? {};
            if (docData?.items?.length) {
                docData?.items.forEach((item) => {
                    component.items = [...component.items, item];
                })
            }
            return component;
        }
    } catch (error) {
        console.log(error.message);
        return {}
    }
}
module.exports = {
    get
}