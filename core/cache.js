"use strict";
// const config = require("../config");
const firebase = require("../db");
const Cache = require("../models/cache");
const firestore = firebase.firestore();
const addItem = async (id, item) => {
    let cache = await load(id);
    if (cache.items !== undefined) {
        if (!cache.items.includes(item)) {
            cache.items = [...cache.items, item];
        }
    } else {
        cache.items = [item];   
    }
    return cache
}
const removeItem = async (id, item) => {
    let cache = await load(id);
    if (cache.items !== undefined) {
        if (!cache.items.includes(item)) {
            cache.items = [...cache.items, item];
        }
    } else {
        cache.items = [item];
    }
    return cache
}
const load = async (id) => {
    try {
        console.log(`load: id: ${id}`);

        const doc = await firestore.collection('caches').doc(id).get()
        if (doc === undefined) {
            console.log("No cache data found");
            return new Cache(id)
        } else {
            const cache = new Cache(id)
            doc.data().items.forEach((item) => {
                cache.items = [...cache.items, item];
            })
            return cache;
        }
    } catch (error) {
        console.log(error.message);
        return {}
    }
}
const save = async (cache) => {
    try {
        const doc = await firestore.collection("caches").doc(cache.id);
        await doc.set({ items: cache.items }, { merge: true });
        return true
    } catch (error) {
        console.log(error.message);
        return false
    }
}
module.exports = {
    loadCache: load,
    saveCache: save,
    addToCache: addItem
}