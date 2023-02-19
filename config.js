"use strict";
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
const URL = `http://${process.env.HOST}:${process.env.PORT}`;
const PRODUCTION = process.env.PRODUCTION  || true;
const VATMETRIC = process.env.VATMETRIC || 0.2;
const ADMIN_MAIL = process.env.ADMIN_EMAIL || "admin01@googlemail.com";
const ADMIN_HASH = process.env.ADMIN_HASH || "$2a$10$4SbIkdVXU0x.85H6PQ2qZudHljCZEi42.aAgnReTopjCstHK4GUa.";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const TOKEN_LIFE_SPAN = process.env.TOKEN_LIFE_SPAN || "10m";
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
const vatMetric = () => {

  if(VATMETRIC.includes(".")) {
      return Number(VATMETRIC)
  } else {
    return Number(VATMETRIC.replace("%","")) / 100
  }
  
}
const log = () => {
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
  console.log(`Vat Metric: ${vatMetric()}`);
  console.log(`Admin Mail: ${ADMIN_MAIL}`);
  console.log(`Admin Hash: ${ADMIN_HASH}`);
  console.log(`Access Token Secret: ${ACCESS_TOKEN_SECRET}`);
  console.log(`Refresh Token Secret:: ${REFRESH_TOKEN_SECRET}`);
  console.log(`Token Life Span: ${TOKEN_LIFE_SPAN}`);
}
module.exports = {
  port: PORT,
  host: HOST,
  url: URL,
  firebaseConfig: FIREBASE_CONFIG,
  production: PRODUCTION,
  adminMail: ADMIN_MAIL,
  adminHash: ADMIN_HASH,
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  refreshTokenSecret: REFRESH_TOKEN_SECRET,
  tokenLifeSpan: TOKEN_LIFE_SPAN,
  vatMetric,
  log
}

