"use strict";
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
const URL = `http://${process.env.HOST}:${process.env.PORT}`;
const USE_VIEW_ENGINE = process.env.USE_VIEW_ENGINE === "true" ? true : false;
const PRODUCTION = process.env.PRODUCTION === "true" ? true : false;
const ADMIN_MAIL = process.env.ADMIN_EMAIL || "admin01@googlemail.com";
const ADMIN_HASH = process.env.ADMIN_HASH || "$2a$10$4SbIkdVXU0x.85H6PQ2qZudHljCZEi42.aAgnReTopjCstHK4GUa.";
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
let PROJECT_SETTINGS = {
  name: "",
  accessTokenSecret: "",
  refreshTokenSecret: "",
  authLifeSpan: "",
  tokenLifeSpan: "",
  vatMetric: ""
};
// FUNCTIONS
const setProjectSettings = (data)=> {
  PROJECT_SETTINGS.name = data.name;
  PROJECT_SETTINGS.accessTokenSecret = data.accessTokenSecret;
  PROJECT_SETTINGS.refreshTokenSecret = data.refreshTokenSecret;
  PROJECT_SETTINGS.authLifeSpan = data.authLifeSpan;
  PROJECT_SETTINGS.tokenLifeSpan = data.tokenLifeSpan;
  PROJECT_SETTINGS.vatMetric = data.vatMetric;
}
const projectName = ()=> {
  return PROJECT_SETTINGS.name
}
const accessTokenSecret = ()=> {
  return PROJECT_SETTINGS.accessTokenSecret
}
const refreshTokenSecret = ()=> {
  return PROJECT_SETTINGS.refreshTokenSecret
}
const authLifeSpan = ()=> {
  return PROJECT_SETTINGS.authLifeSpan
}
const tokenLifeSpan = ()=> {
  return PROJECT_SETTINGS.tokenLifeSpan
}
const vatMetric = ()=> {
  return PROJECT_SETTINGS.vatMetric
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
  // console.log(`Vat Metric: ${vatMetric()}`);
  console.log(`Admin Mail: ${ADMIN_MAIL}`);
  console.log(`Admin Hash: ${ADMIN_HASH}`);
  // console.log(`Access Token Secret: ${ACCESS_TOKEN_SECRET}`);
  // console.log(`Refresh Token Secret:: ${REFRESH_TOKEN_SECRET}`);
  // console.log(`Token Life Span: ${TOKEN_LIFE_SPAN}`);
  console.log(`Use View Engine: ${USE_VIEW_ENGINE}`);
  // console.log(`Auth Life Span: ${authLifeSpan()}`);
}
module.exports = {
  port: PORT,
  host: HOST,
  url: URL,
  firebaseConfig: FIREBASE_CONFIG,
  useViewEngine: USE_VIEW_ENGINE,
  production: PRODUCTION,
  adminMail: ADMIN_MAIL,
  adminHash: ADMIN_HASH,
  setProjectSettings,
  projectSettings: PROJECT_SETTINGS,
  projectName,
  accessTokenSecret,
  refreshTokenSecret,
  authLifeSpan,
  tokenLifeSpan,
  vatMetric,
  log
}