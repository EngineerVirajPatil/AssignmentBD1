const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

let taxRate = 5;
let discountPercentage = 10;
let LoyaltyRate = 2;

function calculateTotalCartValue(newItemPrice, cartTotal) {
  let finalCartTotal = newItemPrice + cartTotal;
  return finalCartTotal;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTotalCartValue(newItemPrice, cartTotal).toString());
});

function checkMembershipDiscount(cartTotal, isMember) {
  let finalPrice;
  if (isMember) {
    finalPrice = cartTotal - (cartTotal * discountPercentage) / 100;
    return finalPrice;
  } else {
    return (finalPrice = cartTotal);
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(checkMembershipDiscount(cartTotal, isMember).toString());
});

function calculateTax(cartTotal) {
  let finalTax;
  finalTax = (cartTotal * taxRate) / 100;
  return finalTax;
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal).toString());
});

function calculateEstimateDelivery(shippingMethod, distance) {
  let deliveryDays;
  if (shippingMethod === 'Standard') {
    deliveryDays = distance / 50;
    return deliveryDays;
  } else {
    deliveryDays = distance / 100;
    return deliveryDays;
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(calculateEstimateDelivery(shippingMethod, distance).toString());
});

function calculateShippingCost(weight, distance) {
  let shippingCost;
  shippingCost = weight * distance * 0.1;
  return shippingCost;
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance).toString());
});

function calculateLoyaltyPoints(purchaseAmount) {
  let loyaltyPoints;
  loyaltyPoints = purchaseAmount * LoyaltyRate;
  return loyaltyPoints;
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
