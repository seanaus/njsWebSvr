const firebase = require("../db");
const Settings = require('../models/settings');
const firestore = firebase.firestore();

const get = async () => {
    try {
        const doc = await firestore.collection('project').doc('settings').get();
        if (!doc.exists) {
            return new Settings('Not Found', '', 'false', '', "", "", "");
        } else {
            console.log("SETINGS SERVICE");
            console.log(`Name: ${doc.data()?.name}`);
            console.log(`Vat Metric: ${doc.data()?.vatMetric}`);
            console.log(`Access Token Secret: ${doc.data()?.accessTokenSecret}`);
            console.log(`Refresh Token Secret: ${doc.data()?.refreshTokenSecret}`);
            console.log(`Token Life Span: ${doc.data()?.tokenLifeSpan}`);
            console.log(`Auth Life Span: ${doc.data()?.authLifeSpan}`);
            return new Settings(
                doc.data()?.name,
                vatMetric(doc.data()?.vatMetric),
                doc.data()?.accessTokenSecret,
                doc.data()?.refreshTokenSecret,
                toMilliseconds(doc.data()?.tokenLifeSpan),
                toMilliseconds(doc.data()?.authLifeSpan)
            )
        }
    } catch (error) {
        console.log(error.message);
        return {}
    }
}
const toMilliseconds = (value) => {

    if(!value || value === undefined) {
        return 0
    }
    // MILLISECONDS
    if (value.includes("ms")) {
      return Number(value.replace('ms', ""))
    }
     // SECONDS
    if (value.includes("s") && !value.includes("ms")) {
      return Number(value.replace('s', "")) * 1000
    }
    // MINUTES
    if (value.includes("m") && !value.includes("ms")) {
      return Number(value.replace('m', "")) * 60 * 1000
    }
    // HOURSvalue
    if (value.includes("h")) {
      return Number(value.replace('h', "")) * 60 * 60 * 1000
    }
  
  }
  const vatMetric = (value) => {
    if(value.includes(".")) {
        return Number(value)
    } else {
      return Number(value.replace("%","")) / 100
    }
    
  }
module.exports = {
    get
}