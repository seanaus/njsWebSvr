"use strict";
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
const URL = `http://${process.env.HOST}:${process.env.PORT}`;
const PRODUCTION = process.env.PRODUCTION;
const FIREBASE_CONFIG = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASSUREMENT_ID
};
const log = ()=> {
  console.log(`port: ${PORT}`);
  console.log(`host: ${HOST}`);
  console.log(`url: ${URL}`);
  console.log(`apikey: ${FIREBASE_CONFIG.apiKey}`);
  console.log(`authDomain: ${FIREBASE_CONFIG.authDomain}`);
  console.log(`databaseURL: ${FIREBASE_CONFIG.databaseURL}`);
  console.log(`projectId: ${FIREBASE_CONFIG.projectId}`);
  console.log(`storageBucket: ${FIREBASE_CONFIG.storageBucket}`);
  console.log(`messagingSenderId: ${FIREBASE_CONFIG.messagingSenderId}`);
  console.log(`appId: ${FIREBASE_CONFIG.appId}`);
  console.log(`measurementId: ${FIREBASE_CONFIG.measurementId}`);
  console.log(`production: ${PRODUCTION}`);
}
module.exports = {
  port: PORT,
  host: HOST,
  url: URL,
  firebaseConfig: FIREBASE_CONFIG,
  production: PRODUCTION,
  log
}

// module.exports = {
//   port: process.env.PORT,
//   host: process.env.HOST,
//   url: `http://${process.env.HOST}:${process.env.PORT}`,
//   firebaseConfig: {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     databaseURL: process.env.DATABASE_URL,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MEASSUREMENT_ID
//   },
//   production: process.env.PRODUCTION,
// };



/* "use strict";
const env = require("dotenv").config();

const PORT = env.PORT;
const HOST = env.HOST;
const HOST_URL = env.HOST_URL;

const API_KEY = env.API_KEY;
const AUTH_DOMAIN = env.AUTH_DOMAIN;
const DATABASE_URL = env.DATABASE_URL;
const PROJECT_ID = env.PROJECT_ID;
const STORAGE_BUCKET = env.STORAGE_BUCKET;
const MESSAGING_SENDER_ID = env.MESSAGING_SENDER_ID;
const APP_ID = env.APP_ID;
const MEASSUREMENT_ID = env.MEASSUREMENT_ID;
const PRODUCTION = env.production;

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASSUREMENT_ID
  },
  production: PRODUCTION
};
 */