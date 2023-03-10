"use strict";
const firebase = require("../db");
const Cache = require("../models/cache");
const firestore = firebase.firestore();

const add = async (id, item) => {
    const cache = await addItem(id, item);
    return await save(cache);
}
const remove = async (id, item) => {
    const cache = await delItem(id, item);
    return await save(cache);
}
const addItem = async (id, item) => {
    let cache = await get(id);
    if (!cache.items.includes(item)) {
        cache.items = [...cache.items, item];
    }
    return cache
}
const delItem = async (id, item) => {
    let cache = await get(id);
    cache.items = cache.items.filter(itm => {
        return itm !== item
    })
    return cache
}
const get = async (id) => {
    try {
        const docRef = firestore.collection('cache').doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return new Cache(id)
        } else {
            const cache = new Cache(id);
            const docData = doc.data() ?? {};
            // if (docData && docData.items && docData.length) {
            if (docData?.items?.length) {
                docData?.items.forEach((item) => {
                    cache.items = [...cache.items, item];
                })
            }
            // }
            return cache;
        }
    } catch (error) {
        console.log(error.message);
        return {}
    }
}
const save = async (data) => {
    try {
        const doc = await firestore.collection("cache").doc(data.id);
        await doc.set({ items: data.items }, { merge: true });
        return true
    } catch (error) {
        console.log(error.message);
        return false
    }
}
module.exports = {
    get,
    add,
    remove
}