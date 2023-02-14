"use strict";
// const config = require("../config");
const firebase = require("../db");
const Cache = require("../models/cache");
const firestore = firebase.firestore();
const load = async (id) => {
    try {
        const doc = await firestore.collection('cache').doc(id).get()
        if (doc === undefined) {
            console.log("No cache data found");
            return {}
        } else {
            const cache = new Cache(id)
            doc.data().items.forEach((item) => {
                cache.add(item);
            })
            return cache;
        }
    } catch (error) {
        console.log(error.message);
        return {}
    }
}
const save = async(cache) => {
    try {
        const doc = await firestore.collection("cache").doc(cache.id);
        await doc.set({ items: cache.items }, { merge: true });
        return true
    } catch (error) {
        console.log(error.message);
        return false
    }
}
module.exports = {
    loadCache : load,
    saveCache : save
}