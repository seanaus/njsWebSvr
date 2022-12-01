"use strict";
const PORT = "8080";
const HOST = "localhost";
const HOST_URL = `http://${HOST}:${PORT}`;

const API_KEY = "AIzaSyA9jD9XeiH6vR25XFVAZzoxpnmEgaaTKGk";
const AUTH_DOMAIN = "njswebsvr.firebaseapp.com";
const DATABASE_URL = "https://njswebsvr.firebase.com";
const PROJECT_ID = "njswebsvr";
const STORAGE_BUCKET = "njswebsvr.appspot.com";
const MESSAGING_SENDER_ID = "725238672717";
const APP_ID = "1:725238672717:web:5ac82f377a8aa8a1a29b04";
const MEASSUREMENT_ID = "G-L6R2VW0RSD";

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
  production: false
};
