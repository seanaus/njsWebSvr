"use strict";
const firebase = require("../db");
const Product = require("../models/product");
const firestore = firebase.firestore();

const loadProduct = async (id) => {
  const products = await loadProducts();
  return products.find(prod => {
    return prod.id === id;
  });
}
const loadProducts = async () => { 
    let productArray = [];
    try {
      // Get Product Collection
      const products = await firestore.collection("products");
      const data = await products.get();
  
      if (data.empty) {
        console.log("No product records found");
      } else {
        data.forEach((doc) => {
            const product = new Product(
              doc.id,
              doc.data().name,
              doc.data().description,
              doc.data().image,
              doc.data().gallery,
              doc.data().unitCost
            );
            productArray = [...productArray, product]
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    return productArray;
  }

module.exports = {
  loadProduct,
  loadProducts
}