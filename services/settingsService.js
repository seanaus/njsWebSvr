const firebase = require("../db");
const Settings = require('../models/settings');
const firestore = firebase.firestore();

const get = async () => {
    try {
        const doc = await firestore.collection('project').doc('settings').get();
        if (!doc.exists) {
            return new Settings('Not Found', '', 'false', '', "", "", "");
        } else {
            return new Settings(
                doc.data()?.name,
                doc.data()?.vatMetric,
                doc.data()?.accessTokenSecret,
                doc.data()?.refreshTokenSecret,
                doc.data()?.tokenLifeSpan,
                doc.data()?.authLifeSpan
            )
        }
    } catch (error) {
        console.log(error.message);
        return {}
    }
}
module.exports = {
    get
}