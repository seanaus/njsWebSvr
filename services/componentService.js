"use strict";
const firebase = require("../db");
const Component = require("../models/component");
const firestore = firebase.firestore();

const get = async (id, page = undefined) => {
    try {
        const docRef = firestore.collection('components').doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return new Component(id)
        } else {
            const component = new Component(id);
            const docData = doc.data() ?? {};
            for (const field in docData) {
                if (field !== 'items') {
                    component.add(field, docData[field])
                } else {
                    if (docData?.items?.length) {
                        docData?.items.forEach((item) => {
                            component.addItem(item);
                        })
                    }
                }
            }
            if (page && page !== undefined) {
                component.items = pageItems(component.items, page);
            }
            return component;
        }

    } catch (error) {
        console.log(error.message);
        return {}
    }
}
const pageItems =  (data, page) => {
    return data.filter((value) => {
        return value.page === page
    })
}
module.exports = {
    get
}